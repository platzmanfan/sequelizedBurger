module.exports = function(sequelize,Datatypes){
        var Burger = sequelize.define("burger",{
                burger_name:{
                    type:Datatypes.STRING,
                    allowNull:false
                },
                devoured:{
                    type:Datatypes.BOOLEAN,
                    defaultValue:false
                },
                


        })


}



