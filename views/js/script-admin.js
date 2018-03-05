$( document ).ready(function() {
	

  /*        NAVODILE 
         
         TODO:
         
         preštudirej še malo express js
         nadaljuj z mappingom po addressah https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
         
                poženi "testrpc" --ni treba
                
                poženi "nodemon" ali node start v direktoriju
                
                v remix daj provider Web3 in da posluša porte/metamask
                
                lahko RUn> contract load from address: zadnja verzija spodaj preveri

                startej z

                nodemon

                url: localhost:3000

  */
          
                /* ali imamo povezavo */
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider); /* metmask*/
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); /* Connect to a geth server over JSON-RPC*/
        }

                /* which network are we on*/
        web3.version.getNetwork((err, netId) => {
         switch (netId) {
                case "1":
                $("#network").html('Mainnet! Get out!');						  
                break
                case "2":
                $("#network").html('Deprecated Morden test network');						  
                break
                case "3":
				$("#network").html('Ropsten test network');						                            
                break
                case "4":
				$("#network").html('Rinkeby test network');						                            
                break
                case "42":
                $("#network").html('Kovan test network');						  
                break
                default:
                $("#network").html('Unknown network');						  
                }
                });
				
				var filter = web3.eth.filter('latest');
                filter.watch(function(error, result) {
					var block = web3.eth.getBlock(result, true, function(error, result) {                       
							$("#lastblocks").prepend('<div class="lastblock chip white-text red darken-4"><i class="material-icons">label</i> '+result.number+'</div>');
							$(".blockprogress").hide();
					if (!error) {
					} else {
							$("#loader").hide();
							console.error(error);
					}
					
					});             
                });
                
                /* šele po callbacku lahko dobimo Metamask account */
                
				var userArticles = [];
				var myAccount;
				web3.eth.getAccounts(function(error, accounts) {   
				
						myAccount = accounts[0];
                        $(".identification").html(myAccount);/* default je prvi iz arraya*/   
						
						FinalContract.returnUserData(accounts[0],function(error, userdata){ /* get array */
						if(!error) { 							
								userArticles = userdata[0];
								$.unique(userArticles); /*get rid of duplicates*/
								$("#tokenbalance").html(userdata[1].toNumber());									
							} else {console.error(error)};
						});
						
                });
                
        /* smartcontract reference */
		var smartcontractaddress = "0xfd26f151e012031ec82cfd9de1f5d7e4f2d90421"; /* 1st SET SC address*/	      
        /*INSERT ABI HERE*/
        var FinalContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "balanceOf",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "returnUserData",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "getValueByHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserList",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getArticleList",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractCreatorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "value",
				"type": "string"
			}
		],
		"name": "addHashValue",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "setUserTokenBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_articles",
				"type": "bytes32[]"
			}
		],
		"name": "userSignArticles",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]).at(smartcontractaddress);
		
		
		
		$(".contractaddress").html(smartcontractaddress);	
		
        FinalContract.contractCreatorAddress.call(function(error, result){ /* CALL constant */
                if(!error) { $(".contractcreator").html(result); } else console.error(error);
                });
		
		FinalContract.contractName.call(function(error, result){ /* CALL constant */
                if(!error) { $(".contractname").html(result); } else console.error(error);
                });
		
		/* build users list, extract ids of article participants, extract user balances*/
		var UsersList = [];
		var ArticlesUsers = {};
		FinalContract.getUserList(function(error, result){ /* get knowsn user array */
                if(!error) { 
					
					UsersList = result;
					$.unique(UsersList); 					
						
					$.each(UsersList, function( key, value ) {							
						var user_id = value;
												
						FinalContract.returnUserData(user_id,function(error, result){ /* get array */
						if(!error) { 	
						
						$.each(result[0], function( key, value ) { /* users on single article*/				
								if ( ArticlesUsers.hasOwnProperty(value) ) { /* does key already exist?*/
									ArticlesUsers[value.toString()] = ArticlesUsers[value.toString()]+", "+user_id;
								} else {
									ArticlesUsers[value.toString()] = user_id; /*1st occurence*/
								}
							});
							
						/*user balances list*/	
						 $("#UserAccountsBalances").append('<li class="collection-item"><div>'+user_id+'<span class="secondary-content"><input class="balanceinput" type="text" value="'+result[1]+'"><i class="material-icons setbalanceicon" attr-data="'+user_id+'">check</i></span></div></li>');
						 	
						} else console.error(error);
						});	
			
					});
					
				} else console.error(error);
        });
		
		
		
		FinalContract.getArticleList(function(error, result){ /* get array */
                if(!error) { 
					
					var ArticleList = result;
					$.unique(ArticleList); /* get rid of duplicates */
					$.each(ArticleList, function( key, value ) {												
						
						FinalContract.getValueByHash(value ,function(error, result){ /* itterate trough previus array // value = input hash */
							if(!error) { 												
								var participants = ArticlesUsers[value];								
								if (typeof participants === 'undefined' || !participants) participants = "/";
								
								$("#articlelist").append('<div class="card article"><div class="articlehash white teal-text text-lighten-2">Article hash: <span>'+value+'</span></div><div class="card-content"><p class="flow-text">'+result+'</p></div><div class="card-action"><div class="row"><div class="col s12 left-align">Participants: '+participants+'</div></div></div></div>');

							} else console.error(error);
						});
						
					});
					
				} else console.error(error);
                });
		
		/* SIGN CONTRACT AND ENGRAVE*/
        $("#newarticle").click(function() {
		
		$('.modal').modal({
			dismissible: false, // Modal can be dismissed by clicking outside of the modal			
			inDuration: 500, // Transition in duration
			outDuration: 500
			
			}
			);
		
			var newarticlestring = $("#newarticletext").val();
			
			FinalContract.addHashValue(newarticlestring,function(error, result){ /* get array */
                if(!error) { 			
					$("#transactionid").html(result);
					
					
				/* add provizoriš item to list*/
				
				$("#articlelist").append('<div class="card article"><div class="articlehash white teal-text text-lighten-2">Article hash: <span>In creation</span></div><div class="card-content"><p class="flow-text">'+newarticlestring+'</p></div><div class="card-action"><div class="row"><div class="col s12 center-align"><div class="progress"><div class="indeterminate"></div></div></div></div></div></div>');
				
					
				} else {
					$("#transactionid").html("Rejected");	
					console.error("Rejected: "+error);
				}
                });			
				
		});	

		/* SET USER BALANCE */
		$("body").on("click", ".setbalanceicon", function() {
			
			setaddress = $(this).attr("attr-data").toString();
			setbalance = $(this).prev(".balanceinput").val();
				
			FinalContract.setUserTokenBalance(setaddress, setbalance,function(error, result){ 
                if(!error) { 			
				
					$("#tokenbalance").html(setbalance);
					console.log("Tx: "+result);				
				} else {					
					console.error("Rejected: "+error);
				}
            });			
		});	
		
/*on ready*/                
});  