#!/bin/bash

# This bash script is used to check and update
# all the dependencies of the project.

RED='\033[0;31m'        # Red
GREEN='\033[0;32m'      # Green
BLUE='\033[0;34m'       # Blue
YELLOW='\033[0;33m'     # Yellow
GREY='\033[0;37m'       # Grey
NC='\033[0m'            # No (reset)

while true; do
    echo -e "${YELLOW}"
    echo -e "------------------------"
    echo -e "Please choose an option:"
    echo -e "------------------------"
    echo -e "00: To check all dependencies current state."
    echo -e "01: To update & install all dependencies."

    echo -e "${BLUE}"
    read -p "Do you wish to update all the dependencies?: " option

    case $option in
        "00")
            echo -e "${GREEN}"
            echo -e "-----------"
            echo -e "Checking..."
            echo -e "-----------"
            echo -e "${GREY}"
            ncu

            echo -e "${NC}"
            echo -e
            break;;
        "01")
            echo -e "${GREEN}"
            echo -e "-----------"
            echo -e "Updating..."
            echo -e "-----------"
            echo -e "${GREY}"
            ncu -u
            sudo rm -R node_modules
            sudo rm yarn.lock
            yarn && yarn cache clean

            echo -e "${NC}"
            echo -e
            break;;
        *)
            echo -e "\n${RED}Please choose a correct option: 00, 01!";;
    esac
done
