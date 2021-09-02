var connection=require('../config/connection');

//shift assignment
exports.dutydeployement = (req,res)=>{
    var duty_types=[];
    var staff=[];
    var data2=[]
    var arr=[];
    var count=0;
    var someDate = new Date();
var numberOfDaysToAdd = 7;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
// console.log(someDate)
var duty_deployment_date;

     var query="select id from tbl_staff ORDER BY RAND();select duty_name from tbl_duty_types"
     ;
     connection.query(query,(err,data)=>{
         if(err) {
             res.send(err);
         }
         else{
            
             data[1].map((item)=>{
                duty_types.push(item.duty_name)
             })
             data[0].map((item)=>{
                staff.push(item.id)
             })
            
            }
            
        
           
        
            req.body.data.map((i)=>{
            return arr.push(Object.values(i),someDate)
            })
            // arr=arr.push(someDate)
            arr=arr.flat()
            const newArr = [];
       while(arr.length) newArr.push(arr.splice(0,3));
    //    console.log(newArr);
            
      for(k=0;k<req.body.data.length;k++){
   
          for(var j=0;j<req.body.data[k].count;j++)
      {
          if(staff.length>0)
          {
          var data1=[];
          data1.push(req.body.data[k].name)
          data1.push(staff[0])
          staff.splice(0,1)
          data1.push(someDate)
          data2.push(data1)
          }else{
              count=count+1;
          }
      
      }  
           
       }


    
       var query="SELECT  to_date FROM dummy_shift_count ORDER by id desc LIMIT 1"
       ;
       connection.query(query,(err,date)=>{
           if(err) {
               res.send(err);
           }
           else{

         duty_deployment_date=date
           
        }
       


    if(duty_deployment_date <= new Date() || duty_deployment_date == null )
    {
       if(count==0)
       {
       var sql=`INSERT INTO dummy_shift_count (shift_type ,shift_count,to_date) VALUES ?;INSERT INTO dummy_shift_assignment (shift_type,staffId,to_date) VALUES ?`;
    connection.query(sql,[newArr,data2],(err,response)=>{
        if(err){
            
            res.send(err)
           
        }
        else{
            res.status(200).json({"message":"Duty deployment successful","data":data2})
        }
       
        
    })
}else{
    res.json({"Error":"count can't be more than members"})
}
}else{
    res.json({"Error":"Shift assignment already done!"})
}

})
   
})
    }


  
    

//duty_type assignment

exports.duty_type_assignment=(req,res)=>{
    var shiftA_staff=[];
    var shiftB_staff=[];
    var shiftC_staff=[];
    var staffA=[];
    var staffB=[];
    var staffC=[];
    var count=0;
    var staff=[];
    var duty_deployment_date;
    var someDate = new Date();
    var numberOfDaysToAdd = 7;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 


    var query=`SELECT staffId FROM dummy_shift_assignment WHERE createdAt='${req.body.date}' and shift_type="shiftA";
    SELECT staffId FROM dummy_shift_assignment WHERE createdAt="${req.body.date}" and shift_type="shiftB";
    SELECT staffId FROM dummy_shift_assignment WHERE createdAt="${req.body.date}" and shift_type="shiftC";`
    ;
    connection.query(query,(err,data)=>{
        if(err) {
            res.send(err);
        }
        else{
         data[0].map((i)=>{
            return shiftA_staff.push(Object.values(i))
            })
          
             data[1].map((j)=>{
            return shiftB_staff.push(Object.values(j))
            })
           
            data[2].map((k)=>{
                return shiftC_staff.push(Object.values(k))
            })
           }
           shiftA_staff=shiftA_staff.flat()
           shiftB_staff=shiftB_staff.flat()
           shiftC_staff=shiftC_staff.flat()


           for(k=0;k<req.body.shiftA_duty.length;k++){
   
            for(var j=0;j<req.body.shiftA_duty[k].count;j++)
        {
            if(shiftA_staff.length>0)
            {
            var data1=[];
            data1.push("ShiftA")
            data1.push(req.body.shiftA_duty[k].name)
            data1.push(shiftA_staff[0])
            shiftA_staff.splice(0,1)
            data1.push(someDate)
            staffA.push(data1)
            }else{
                count=count+1;
            }
        
        }  
             
         }
        //  res.send(staffA)


         for(k=0;k<req.body.shiftB_duty.length;k++){
   
            for(var j=0;j<req.body.shiftB_duty[k].count;j++)
        {
            if(shiftB_staff.length>0)
            {
            var data2=[];
            data2.push("ShiftB")
            data2.push(req.body.shiftB_duty[k].name)
            data2.push(shiftB_staff[0])
            shiftB_staff.splice(0,1)
            data2.push(someDate)
            staffB.push(data2)
            }else{
                count=count+1;
            }
        
        }  
             
         }


         for(k=0;k<req.body.shiftC_duty.length;k++){
   
            for(var j=0;j<req.body.shiftC_duty[k].count;j++)
        {
            if(shiftC_staff.length>0)
            {
            var data3=[];
            data3.push("ShiftC")
            data3.push(req.body.shiftC_duty[k].name)
            data3.push(shiftC_staff[0])
            shiftC_staff.splice(0,1)
            data3.push(someDate)
            staffC.push(data3)
            }else{
                count=count+1;
            }
        
        }  
             
         }


// res.json({"a":staffA,"b":staffB,"c":staffC})
      
staff.push(staffA)
staff.push(staffB)
staff.push(staffC)
staff=staff.flat()
// res.send(staff)

var query="SELECT  to_date FROM dummy_duty_deployment ORDER by id desc LIMIT 1"
       ;
       connection.query(query,(err,date)=>{
           if(err) {
               res.send(err);
           }
           else{

         duty_deployment_date=date
           
        }
       


    if(duty_deployment_date <= new Date() || duty_deployment_date == null )
    {
     if(count==0){
         var sql=`INSERT INTO dummy_duty_deployment (shift_type,duty_type,staffId,to_date) VALUES ?`
      connection.query(sql,[staff],(err,response)=>{
          if(err){
              
              res.send(err)
             
          }
          else{
              res.status(200).json({"message":"Duty deployment successful","data":staff})
          }
        })
        }else{
       res.json({"Error":"count can't be more than staff"})
        }
     
    }else{
        res.json({"Error":"Duty_deployment already done!"})
    }

})  
       
})   
}
        
     
     
