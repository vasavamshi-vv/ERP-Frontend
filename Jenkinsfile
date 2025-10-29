pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        AWS_CREDENTIALS = credentials('aws-creds')
        GITHUB_TOKEN = credentials('github-token')
        EC2_USER = 'ubuntu'
        EC2_HOST = '16.176.229.100'  // change this
        PEM_KEY = '/var/lib/jenkins/.ssh/Erp-Jenkins-key.pem'  // your EC2 key
    }

    stages {
        stage('Checkout Frontend') {
            steps {
                echo 'Cloning Frontend Repo...'
               git branch: 'main', url: 'https://github.com/vasavamshi-vv/ERP-Frontend.git', credentialsId: 'github-token'
            }
        }

        stage('Checkout Backend') {
            steps {
                echo 'Cloning Backend Repo...'
                dir('backend') {
                    git branch: 'main', url: 'https://github.com/vasavamshi-vv/ERP-Backend.git', credentialsId: 'github-token'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                    echo "Installing and building frontend..."
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh '''
                    echo "Setting up backend..."
                    pip install -r requirements.txt || npm install
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to AWS EC2...'
                sh '''
                # Copy frontend build output to EC2 web directory
                scp -i $PEM_KEY -r frontend/build/* $EC2_USER@$EC2_HOST:/var/www/html/

                # Deploy backend and restart server
                ssh -i $PEM_KEY $EC2_USER@$EC2_HOST "
                    cd /home/ubuntu/backend || mkdir backend && cd backend
                    git clone https://github.com/vasavamshi-vv/ERP-Backend.git || (cd erp-backend && git pull)
                    nohup python3 manage.py runserver 0.0.0.0:8000 &
                "
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
