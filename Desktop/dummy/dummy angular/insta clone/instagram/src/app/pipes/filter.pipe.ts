import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(friendSuggestions:any[],searchTerm:string,propertyName:string): any[] {
    const result:any=[]
    if(!friendSuggestions || searchTerm==''  ||  propertyName==''){
      return friendSuggestions
    }
    friendSuggestions.forEach((item)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })

    return result
    



  }

}
