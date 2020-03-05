pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/NJU-SE3/OASIS-Service']]])
            }
        }
        stage('Build') {
            steps {
                echo 'Building'
                sh 'make depend'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
                sh 'make deploy'
            }
        }
    }
}