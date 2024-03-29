## Doxchain VM image
The Doxchain VM image can be found here: https://drive.google.com/open?id=1JxjQtzscduTC5Bj-5vRXTP5SpSbJtjA-
username: doxchain
password: 666666
(Alternatively, you can also clone and deploy the Doxchain project on your own computer. Please see the next session)

The Doxchain project can be found on home/workspace/emission-trade-market
To run:

First, navigate to the ```network``` directory.
```
./deploy_network.sh
./deploy_composer.sh 
```
Second, navigate to the ```web``` directory . Setup sample networks containg two markets and five companies.
```
sh setup-market.sh
node server.js
```
The app is now running at localhost:8080
All password are set as ```123```. The regulator's username is ```admin```. Companies' usernames are equal to their Company Name which can be checked on the regulator page.

Note, we use mLab to store company account information: https://mlab.com/databases/doxchain/collections/users 
The account to login mLab:
username: doxchain
password: doxchain123

## Install the prerequisites and the development environment:

You can follow thos tutorials to install prereq and your environment

-Prereq:https://hyperledger.github.io/composer/installing/installing-prereqs.html

-Development Environment:https://hyperledger.github.io/composer/installing/development-tools.html (Step 2 and 3 are not required to run the project)


## How to run:

### To update Composer logic (optional):
To generate a new business network archive (Do it only after changing the composer, otherwise skip this step and go to Setup network)

First, navigate to the ```emission-network``` directory.
```
composer archive create -t dir -n .
```
Then copy the generate  ```emission-network@0.0.1.bna``` file to the  ```network ``` folder.
```
mv emission-network@0.0.1.bna ../network/
```
Now you are ready to deploy the updated busniess logic to the fabric network!

-------------------------------------------------------------------------

### To setup the Fabric network: 


Inside ```network``` directory.
```
sudo chmod u+x *
```

To kill any running containers and remove previous Fabric chaincode images: 
```
./teardownAllDocker.sh
```
Preload fabric:
```
./preload_fabric.sh
```
Then download platform-specific binaries:
```
./getBin.sh
```
Deploy network:
```
./deploy_network.sh
```
Deploy composer:
```
./deploy_composer.sh 
```
That's it. Rest server is now running at localhost:3000!

--------------------------------------------------------------------------

Some errors can be resolved as follow:

  -try to use sudo before to run a script
  
  -if you can't access card files:
    ```
    chmod -R 777 ~/.composer
    ```
    
  -if you still cannot access thos files try this " chmod -R 777 * " in the network directory
 

### To start the front-end client:
Navigate to ```web``` directory.

(Optional) Start with pre-installed markets and companies
```
sh setup-market.sh
```

Start the node cient:
```
node server.js
```
The app is now running at localhost:8080!

![](https://github.com/Gabbe1993/emission-trade-market/blob/master/img/web.png)
# Decentralized emission trade market

Companies active in the Port of Rotterdam operate within a strict emission regulatory framework. This framework sets maximum allowed values per company for each of the emission types (CO2, NOX, SO2 etc.). The sum of the maximum allowed values per emission type /per company cannot exceed the total allowed emissions for the port region as a whole. For some of these emission types companies find it easier to stay below the threshold than for others, while for others it is much more difficult and would require extensive investment.

First step would be to develop a decentralized emission market that would allow companies to trade residual emission space with others, directly (1) or indirectly (2):

Bob has residual NOX emissions, but has reached his maximum allowed value of emissions for SO2. Alice on the other hand has residual SO2 emissions, but needs NOX. The system should provide Bob and Alice with the possibility to trade these emissions.

Bob has residual NOX emissions, but has reached his maximum allowed value of emissions for SO2. Alice only has residual CO2 emissions, but doesn’t need any other emissions. However, elsewhere in the network there’s John who needs additional CO2 emissions and has residual SO2 emissions. The system should provide Bob, Alice and John the possibility to be able to trade these emissions.

Note that there’s a very strict legal framework in place and that for the project to be of any value, aspects of this framework have to be taken into consideration in order for it to be of any actual value. Additional information about this framework and data will be made available to the students upon the start of the project.

The target of this project is to build a decentralized market which allows the companies to trade emission. The following design criterium should be taken into account:

The trading records should be transparent and traceable, and most importantly, fit into the legal framework.

The blockchain should have a very high reliability and security level. On the other hand, the throughput, latency, and storage requirements are relatively low.

A smart matchmaking scheme should also be designed, which allows not only 2-party trades, but also multi-party trading matches.

# What the scripts do

For setting up the network we have created a script deploy_network.sh which does all the necessary steps to deploy our network. These steps include:

1. Generate certificates for each organization using the cryptogen tool
2. Generate orderer genesis block
3. Generate channel configuration transaction 
4. Generate anchor peer updates for each of the organizations
5. Starting docker containers for each of the components for our network
6. Setting up the orderer, channels and each organization joining the channel
7. Updating anchor peers to make sure that there is communication between the organizations
8. Sample chaincode installation for testing purposes on each peer
9. Chaincode instantiation on the channel which initializes the chaincode on the channel, sets the endorsement policy for the chaincode, and launches a chaincode container for the targeted peer.
10. Doing simple queries to make sure components are communicating
11. Invoking a sample transaction to make sure transactions are being written

After making sure the network is successfully set up and all components are communicating between each other, we need to deploy Hyperledger Composer on each of the peers. To do so, we have created deploy_composer.sh script which does the following:

1. Removing any previously created network cards which are crypto certificates used to access the blockchain network
2. Creating network cards for each of the organizations
3. Importing the network cards for installing composer for each of the organizations
4. Installing Composer runtime for each of the organizations
5. Retrieving crypto certificates for network admins for each organization
6. Starting the business network
7. Creating network cards for for network admins for each organization
8. Importing the network cards for for network admins for each organization
9. Pinging the network on behalf of the network admins for each organization
10. Instantiating REST server with the credentials of one organization


