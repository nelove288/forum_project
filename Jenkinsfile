pipeline {
    agent any

    environment {
        IMAGE_NAME = "molax2/forum-frontend"
        COMMIT_HASH = "${env.GIT_COMMIT.take(7)}"
        TAG = "${COMMIT_HASH}"
        FULL_IMAGE = "${IMAGE_NAME}:${TAG}"
        ARGOCD_SERVER = "argocd.example.com"  // ArgoCD 도메인 또는 IP
        ARGOCD_APP_NAME = "forum-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $FULL_IMAGE ./frontend"
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $FULL_IMAGE
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment') {
            steps {
                // 쿠버네티스에 직접 적용하기 위해 kubectl 또는 kustomize를 쓸 수도 있음
                sh """
                kubectl set image deployment/frontend frontend=$FULL_IMAGE -n default
                """
            }
        }

        stage('Sync ArgoCD App') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'argocd-creds', usernameVariable: 'ARGO_USER', passwordVariable: 'ARGO_PASS')]) {
                    sh """
                        argocd login $ARGOCD_SERVER --username $ARGO_USER --password $ARGO_PASS --insecure
                        argocd app sync $ARGOCD_APP_NAME
                        argocd app wait $ARGOCD_APP_NAME --health
                    """
                }
            }
        }
    }
}
