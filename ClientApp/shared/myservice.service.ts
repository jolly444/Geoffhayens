import { Employee} from "./employee.model";

import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HelloWorldService {

    employee: Employee;
    constructor(private http: Http) {

    }

    getData() {

        return this.http.get('http://localhost:60840/api/Employees');
    }


    SaveData(emp: Employee) {

        var obj = JSON.stringify(emp);
        var headerOOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOOptions });

        return this.http.post('http://localhost:60840/api/Employees/', obj, requestOptions).map(x => {

            x.json();

        })
    }

    EditData(id: number) {

        return this.http.get('http://localhost:60840/api/Employees/' + id).map((response: Response) => response.json())

    }

    UpdateData(id: number, emp: Employee) {


        var obj = JSON.stringify(emp);
        var headerOOptions = new Headers({ 'Content-Type': 'application/json' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOOptions });

        return this.http.put('http://localhost:60840/api/Employees/' + id, obj, requestOptions).map(x => {

            x.json();

        });

    }

    DeleteData(id: number) {

        return this.http.delete('http://localhost:60840/api/Employees/' + id).map(x => {
            x.json();

        });
    }


    postFile(caption: string, fileToUpload: File) {
        const endpoint = 'http://localhost:60840/api/UploadImage';
        const formData: FormData = new FormData();
        formData.append('Image', fileToUpload, fileToUpload.name);
        formData.append('ImageCaption', caption);
        return this.http
            .post(endpoint, formData);
    }

    //postFile(Caption: string, fileToUpload: File) {

    //    const endpoint = 'http://localhost:60840/api/UploadImage';
    //    const formData: FormData = new FormData();
    //    formData.append('Image', fileToUpload, fileToUpload.name);
    //    formData.append('ImageCaption', Caption);
    //    let headers = new Headers();
    //    headers.set('Content-Type', 'multipart/form-data');
    //    headers.set('Accept', 'application/json');
    //    let options = new RequestOptions({ headers: headers });
    //    return this.http.post(endpoint, formData, options).map(x => {
    //        x.json();
    //    });
    //}

}