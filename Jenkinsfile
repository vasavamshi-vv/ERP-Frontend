pipeline {
    agent any

    environment {
        NODE_HOME = '/usr/bin'
        PATH = "${NODE_HOME}:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vasavamshi-vv/ERP-Frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                sh '''
                echo "Deploying built files to Nginx directory..."
                sudo rm -rf /var/www/html/*
                sudo cp -r dist/* /var/www/html/
                sudo systemctl restart nginx
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
        }
        failure {
            echo '❌ Build or deployment failed. Please check logs.'
        }
    }
}
