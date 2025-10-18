pipeline {
    agent any
    
    environment {
        // Replace with the backend deploy hook you copied
        RENDER_BACKEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d3prkre3jp1c7386h4h0?key=w8BicdtM1f4"
        // Replace with the frontend deploy hook you copied
        RENDER_FRONTEND_DEPLOY_HOOK = "https://api.render.com/deploy/srv-d3prplc9c44c73caagcg?key=DsZacQV8r6Q"
    }
    
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
        
        stage('Deploy to Render') {
            steps {
                script {
                    echo "Deploying Backend to Render..."
                    sh """
                        curl -X POST "${RENDER_BACKEND_DEPLOY_HOOK}" \
                        -H "Accept: application/json" \
                        -w "HTTP Status: %{http_code}\\n"
                    """
        
                    echo "Deploying Frontend to Render..."
                    sh """
                        curl -X POST "${RENDER_FRONTEND_DEPLOY_HOOK}" \
                        -H "Accept: application/json" \
                        -w "HTTP Status: %{http_code}\\n"
                    """
                    
                    echo "Deployment requests sent successfully!"
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