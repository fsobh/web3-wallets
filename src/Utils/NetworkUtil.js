import NETWORKS from './networks'


export function fetchNetworkNameByID(id) {

    try {
        
        if(!id)
            throw new Error("ID not provided.");
    
        if (!Array.isArray(NETWORKS))
            throw new Error("Network data error");

        return NETWORKS.filter((net) => net.chainId && net.networkId === id)[0]
        
} catch (error) {
        return false
}
    
}
