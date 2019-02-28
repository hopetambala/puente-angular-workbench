import { Component, OnInit } from '@angular/core';
import { QueryCustomService } from '../../providers/query-custom/query-custom.service'

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 18.9130926;
  lng: number = -70.7095201;

  markers: marker[] = []

  constructor(private query:QueryCustomService) { }

  ngOnInit() {
    this.create_all_markers()
    
  }

  create_all_markers(){
    this.query.retrieveAll_patientid_info_by_organization('Puente').then((results)=>{
      for(let i=0;i<results.length;i++){
        let result = results[i]
       
        
        this.markers.push({
          lat: result.get('latitude'),
          lng: result.get('longitude'),
          label: result.get('fname'),
          draggable:true
        }) 

        //console.log(result)

        //this.markers.push()
      }
    })
  }

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label: string;
	draggable: boolean;
}

