#!/bin/bash
source variables

function my_scp {
  scp -i "../key.pem" $1 $DIST_USER@$DIST_IP:$DIST_PATH$2
}

function my_ssh {
  ssh -i "../key.pem" $DIST_USER@$DIST_IP $1
}

my_ssh "rm -rf build"
my_ssh "rm -rf static"

my_scp package.json /
my_scp package-lock.json /
my_scp secret.prod.json /secret.json

my_scp "-r build" /
my_scp "-r static" /

my_ssh "npm install --omit=dev"

my_ssh "sudo pm2 restart 0"
