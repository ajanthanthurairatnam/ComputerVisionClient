import * as React from "react";
import axios from 'axios';
import { useState } from "react";
import { IImageProcessModel, Status } from "./Status";

export function ProcessImage() 
{ 
    const [imageProcessModel, setImageProcessModel] = 
                              useState<IImageProcessModel>({message:"",outputText:"",status:Status.Success,loading:false});
  
    const onChangeHandler=(event:any)=>{
      event.preventDefault();
      setImageProcessModel({message:"",outputText:"",status:Status.Success,loading:true});
      var apiBaseUrl =   "https://computervisionweb20200508095859.azurewebsites.net/Home/ConvertToText";
      if(event.target.files.length>0){
          var filesArray = event.target.files;
          let formData = new FormData();
              formData.append("File",filesArray[0] )
               axios.post(apiBaseUrl, formData, {
                      headers: {'Content-Type': 'multipart/form-data'}
               }).then(e=>{
                const imageProcessModel:IImageProcessModel=e.data;
                setImageProcessModel({...imageProcessModel,loading:false});
               });
      }
      else{
        setImageProcessModel({message:"Please select files first",outputText:"",status:Status.Failure,loading:false});        
      }
  }


    return (
        <div>
          <span>Image File :</span>
          <input type="file" name="file" onChange={onChangeHandler} />
          <br />
          <div>
            {imageProcessModel.loading?"Loading":""}
            {imageProcessModel.status===Status.Success?imageProcessModel.outputText:imageProcessModel.message}
          </div>
        </div>
      );
}

