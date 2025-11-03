pipeline {
    agent any

    environment {
        FRONTEND_REPO = 'https://github.com/vasavamshi-vv/ERP-Frontend.git'
        BACKEND_REPO  = 'https://github.com/vasavamshi-vv/New_ERP_Backend.git'
        EC2_HOST      = '13.239.191.236'
        EC2_USER      = 'ubuntu'
        PEM_KEY       = '/var/lib/jenkins/.ssh/Erp-Jenkins-key.pem'
        DEPLOY_PATH   = '/var/www/html/'
    }

    stages {

        stage('Checkout Frontend') {
            steps {
                echo '📥 Cloning Frontend Repo...'
                git branch: 'main', url: "${FRONTEND_REPO}", credentialsId: 'github-token'
            }
        }

        stage('Checkout Backend') {
            steps {
                echo '📥 Cloning Backend Repo...'
                dir('backend') {
                    git branch: 'main', url: "${BACKEND_REPO}", credentialsId: 'github-token'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo '🏗️ Installing and building frontend...'
                sh '''
                    mkdir -p frontend
                    cp -r * frontend/ || true
                    cd frontend
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend/erp_project') {
                    echo "⚙️ Setting up backend..."
                    sh '''
                    if [ -f requirements.txt ]; then
                        echo "Installing backend dependencies..."
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt

                        echo "Running migrations and collecting static files..."
                        python manage.py migrate
                        python manage.py collectstatic --noinput || true
                        deactivate
                    else
                        echo "requirements.txt not found, skipping backend install."
                    fi
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo '🚀 Deploying to AWS EC2...'
                sh '''
                    echo "Removing old files on EC2..."
                    ssh -o StrictHostKeyChecking=no -i "$PEM_KEY" "$EC2_USER@$EC2_HOST" "sudo rm -rf $DEPLOY_PATH* || true"

                    echo "Copying new build files..."
                    scp -o StrictHostKeyChecking=no -i "$PEM_KEY" -r frontend/dist/* "$EC2_USER@$EC2_HOST:$DEPLOY_PATH"

                    echo "✅ Deployment Complete!"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed.'
        }
    }
}
