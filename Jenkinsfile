pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
                git credentialsId: 'jenkinstoken', url: 'http://212.129.149.40/171250027_expelliarmus/frontend-cold4'
                sh 'npm i npm@latest -g'
            }
        }
        stage('Build') {
            steps {
                echo 'Building'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
                sh 'cd oasis-frontend && make resource deploy'
            }
        }
    }
}