steem.api.setOptions({ url: 'https://api.steemit.com' });
var names=namelist();
console.log(names);
var created=[];
var account=[];
var vest=[];
var received_vest=[];
var spv;
steem.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
spv=parseFloat(result.total_vesting_fund_steem)/parseFloat(result.total_vesting_shares);
console.log(spv);
});
 var utc_now = utc_Now();
var diff=7*24*3600*1000;
 var analysis_date=utc_now-diff;
var reward=0;



function search(){
	

 steem.api.getAccounts(names, function(err, result) {
  console.log(err, result);
  for (let i = 0; i < result.length; i++) {
  created.push(result[i].created);	
 account.push(result[i].name);
 var vest_pushed=(parseFloat(result[i].vesting_shares)*parseFloat(spv));
 var received_vest_pushed=(parseFloat(result[i].received_vesting_shares)*parseFloat(spv));
 vest.push(vest_pushed);
received_vest.push(received_vest_pushed);
	
	
  }
  
  console.log(account,created,vest,received_vest);
});
 
  for (let i = 0; i < names.length; i++) {
 get_reward(names[i]);
 
 
 }
 
}
 	
	function get_reward(name){
	var rev=0;
	var rev_array=[];
	
	console.log(spv);
	steem.api.getAccountHistory(name, -1, 500, function(err, result) {
	
   for (let j = 0; j < result.length; j++) {
   var reward_time=Date.parse(result[j][1].timestamp)
   if((result[j][1].op[0]=="curation_reward")&&(reward_time>=diff)){
   var curation=parseFloat(result[j][1].op[1].reward);
   	reward=reward+curation;
	rev=rev+curation;
	rev_array.push(rev*spv);
	}
   }
    console.log(rev_array);
	console.log(reward*spv);
	console.log(names);
   });
}