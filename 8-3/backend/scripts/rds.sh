#!/bin/bash
source variables
mysql -u $RDS_USER -h $RDS_HOST -p$RDS_PASSWORD
