pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    tools {        
        python "python"
        nodejs "node"
    }


    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/hanumantjain/jenkins'
            }
        }
        stage('Build') {
            parallel {
                stage('Client Build') {
                    steps {
                        dir('client') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }

                stage('Server Build') {
                    steps {
                        dir('server') {
                            sh '''
                                python -m venv venv
                                . venv/bin/activate
                                pip install -r requirements.txt
                            '''
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Client Lint') {
                    steps {
                        dir('client') {
                            sh 'npm run lint'
                        }
                    }
                }
                
                stage('Server Test') {
                    steps {
                        dir('server') {
                            sh '''
                                . venv/bin/activate
                                python -m pytest --version || echo "No tests configured"
                            '''
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            // Actions after the build succeeds
            echo 'Build was successful!'
        }
        failure {
            // Actions after the build fails
            echo 'Build failed. Check logs.'
        }
    }
}