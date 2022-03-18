import NETWORKS from './networks'
'use strict'

async function  fetchNetworkNameByID(id)  {

    try {
        
        if(!id)
            throw new Error("ID not provided.");
    
        if (!Array.isArray(NETWORKS))
            throw new Error("Network data error");

         const a = NETWORKS.filter((net) => net.chainId && net.networkId === id)[0]

         if(a && a.name)
            return a.name;
         else
            return false;
        
} catch (error) {

    console.log(error)
    return false;
}
    
}

export default fetchNetworkNameByID;