#!/bin/bash
source variables
ssh -i "../key.pem" $DIST_USER@$DIST_IP
