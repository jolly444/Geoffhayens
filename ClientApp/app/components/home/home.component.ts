import { Employee} from '../../../shared/employee.model';

import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from '../../../shared/myservice.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [HelloWorldService]
})
export class HomeComponent implements OnInit {
    employeelist: Employee[];
    employeeselected: Employee = {};
    imageUrl: string = "assets/img/default.jpg";
    fileToUpload: File;

    constructor(private service: HelloWorldService, private toastr: ToastrService) {


    }
    ngOnInit() {

        this.ResetData();
        this.service.getData().subscribe(datas => {

            console.log(datas.json());
            this.employeelist = datas.json() as Employee[];
        });
    }

    getData() {

        this.service.getData().subscribe(datas => {

            console.log(datas.json());
            this.employeelist = datas.json() as Employee[];
        });
    }

    ResetData(form?: NgForm) {
        //form.reset();
        this.employeeselected= {

            EmployeeId: 0,
            FirstName: '',
            LastName: '',
            EmpCode: '',
            Position: '',
            Office:''
        }
    }

    onSubmit(form: NgForm) {


        if (form.value.EmployeeId == 0) {

            this.service.SaveData(form.value).subscribe(x => {

                this.ResetData(form);
                this.getData();

            });
        }
        else {
            this.service.UpdateData(form.value.EmployeeId, this.employeeselected).subscribe(x => {

                this.ResetData(form);
                this.getData();

            });

        }

    }

    getSelectedEdit(id: number) {
        this.service.EditData(id).subscribe(x => {

            this.employeeselected = x;
        });

    }


    deleteEmployee(id: number) {

        if (confirm("Are You Sure You Want to delete") == true) {
            this.service.DeleteData(id).subscribe(x => {

                this.getData();

            });



        }

        
    }

    handleFileInput(file: FileList) {

        this.fileToUpload = file.item(0);


        var render = new FileReader();
        render.onload = (event: any) => {

            this.imageUrl = event.target.result;
        }
        render.readAsDataURL(this.fileToUpload);
    }

   

    uploadImageData(Caption: any, Image: any) {
        this.service.postFile(Caption.value, this.fileToUpload).subscribe(
            data => {
                console.log('done');
                Caption.value = null;
                Image.value = null;
                this.imageUrl = "/assets/img/default-image.png";
            }
        );
    }



   

   
    


}
