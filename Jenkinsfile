pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shaiqish/MERN-stack-BookStore-website---Bookies.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f docker-compose-part2.yml build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker-compose -f docker-compose-part2.yml up -d'
            }
        }

    }
}
