function Pie(attributes){
	for(var key,value in attributes){
		this.key = value;
	}
}

module.exports = Pie