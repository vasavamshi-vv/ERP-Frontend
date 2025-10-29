pipeline {
    agent any

    environment {
        FRONTEND_REPO = 'https://github.com/vasavamshi-vv/ERP-Frontend.git'
        BACKEND_REPO  = 'https://github.com/vasavamshi-vv/ERP-Backend.git'
        EC2_HOST      = '16.176.229.100'
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
                dir('frontend') {
                    echo '🏗️ Installing and building frontend...'
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    echo '⚙️ Setting up backend...'
                    // If requirements.txt exists, install dependencies
                    sh '''
                        if [ -f requirements.txt ]; then
                            echo "Installing Python dependencies..."
                            pip install -r requirements.txt || true
                        else
                            echo "No requirements.txt found. Skipping..."
                        fi
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo '🚀 Deploying to AWS EC2...'
                sh '''
                    ssh -o StrictHostKeyChecking=no -i ${PEM_KEY} ${EC2_USER}@${EC2_HOST} "sudo rm -rf ${DEPLOY_PATH}*"
                    scp -o StrictHostKeyChecking=no -i ${PEM_KEY} -r frontend/dist/* ${EC2_USER}@${EC2_HOST}:${DEPLOY_PATH}
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
