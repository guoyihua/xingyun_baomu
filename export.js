'use strict';


var Person = function(text) {
    if (text) {
        var o = JSON.parse(text);
        this.name = o.name;
        this.phone = o.phone;
        this.adress = o.adress;
        this.select_WebAyi = o.select_WebAyi;
        this.select_WebXinzi = o.select_WebXinzi;
        this.select_WebJingyan = o.select_WebJingyan;
    } else {
        this.name = '';
        this.phone = '';
        this.adress = '';
        this.select_WebAyi = '';
        this.select_WebXinzi = '';
        this.select_WebJingyan = '';
    }

};

Person.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};

var LovePool = function() {
    LocalContractStorage.defineMapProperty(this, 'Persons', {
        parse: function(text) {
            var tmpPerson = new Person(text);
            return tmpPerson;
        },
        stringify: function(o) {
            var tmpPerson = o;
            return tmpPerson.toString();
        }
    });
    LocalContractStorage.defineMapProperty(this, 'mapGuzhuCode');//from对应的代码（雇主）
    LocalContractStorage.defineMapProperty(this, 'mapGuzhuSize');//size对应得from(雇主)
    LocalContractStorage.defineMapProperty(this, 'mapAyiCode');//from对应的代码（阿姨）
    LocalContractStorage.defineMapProperty(this, 'mapAyiSize');//size对应得from(阿姨)
	
	
    LocalContractStorage.defineProperty(this, 'ayiNum');
    LocalContractStorage.defineProperty(this, 'guzhuNum');
	LocalContractStorage.defineProperty(this, "size");

};

LovePool.prototype = {
    init: function() {
        this.ayiNum = 0;
        this.guzhuNum = 0;
        this.size = 0;
    },
    
    addGuzhu: function(text) {
        var person = new Person(text);
        if (!person.name || !person.phone || !person.adress || !person.select_WebAyi || !person.select_WebXinzi || !person.select_WebJingyan) {
            throw new Error("雇主资料不全");
        }
        var from = Blockchain.transaction.from;
		var code = person.select_WebAyi+person.select_WebXinzi+person.select_WebJingyan+"";
        if (this.Persons.get(from)) {
            return {
                'error': true,
                'errMsg': '资料已经存在,请勿重复添加'
            };
        }

        this.Persons.set(from, person);
		this.mapGuzhuCode.set(from, code);
		
        this.guzhuNum += 1;
        this.mapGuzhuSize.set(this.guzhuNum - 1, from);
		
        return {
            'success': true
        };
    },
	
	addAyi: function(text) {
        var person = new Person(text);
        if (!person.name || !person.phone || !person.adress || !person.select_WebAyi || !person.select_WebXinzi || !person.select_WebJingyan) {
            throw new Error("阿姨资料不全");
        }
        var from = Blockchain.transaction.from;
		var code = person.select_WebAyi+person.select_WebXinzi+person.select_WebJingyan+"";
        if (this.Persons.get(from)) {
            return {
                'error': true,
                'errMsg': '资料已经存在,请勿重复添加'
            };
        }

        this.Persons.set(from, person);
		this.mapAyiCode.set(from, code);
		
        this.ayiNum += 1;
        this.mapAyiSize.set(this.ayiNum - 1, from);
		
        return {
            'success': true
        };
    },
	
	
    getAyiList: function(text) {
		var arr = [];
        var person = new Person(text);
        var code = person.select_WebAyi+person.select_WebXinzi+person.select_WebJingyan+"";
		for(var i=0;i<this.ayiNum;i++){
			var f = this.mapAyiSize.get(i);
			var c = this.mapAyiCode.get(f);
			if(code == c){
				arr.push(this.Persons.get(f));
			}
		}
        return arr;
        
    },
    getGuzhuList: function() {
        var arr = [];
        var person = new Person(text);
        var code = person.select_WebAyi+person.select_WebXinzi+person.select_WebJingyan+"";
		for(var i=0;i<this.guzhuNum;i++){
			var f = this.mapGuzhuSize.get(i);
			var c = this.mapGuzhuCode.get(f);
			if(code == c){
				arr.push(this.Persons.get(f));
			}
		}
        return arr;
    },
    
}

module.exports = LovePool;