import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../home/home.component';
import { Task, TaskService } from '../../../Service/task.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink,HomeComponent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  public UserForm!:FormGroup;
  public UID:number;
  private AddressId?:number;

  public Tasks?:Task[] = [] ;


  constructor(private fb:FormBuilder , private userService:UserService , private router:Router ,private rout:ActivatedRoute, private toastr: ToastrService ,private taskservice:TaskService){
    this.userFormInit();
    this.UID = Number(rout.snapshot.paramMap.get('id'));
    this.UID ? this. _getUserById() : null;
  }

  ngOnInit(): void {

  }

  private userFormInit(){
    this.UserForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      gender:[''],
      phone:['',[Validators.required,Validators.minLength(5)]],
      address:this.fb.group({
        addressLine1:[''],
        addressLine2:[''],
        city:[''],
        country:[''],
      })
    })
  }

  public _createUser(){
    this.userService.addUser(this.UserForm.value).subscribe(data => {
      this.toastr.success("User Added Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
      this.router.navigate(['/user-list'])
    })
  }

  public _updateUser(){
    let User = this.UserForm.value;
    User.id = this.UID;
    User.address.id = this.AddressId
    User.address.userId = this.UID
    this.userService.updateUser(this.UID,User).subscribe((data) => {
      this.toastr.success("User Update Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
      this.router.navigate(['/user-list']);
    })
  }

  private _getUserById(){
    this.userService.getUserById(this.UID).subscribe((data) => {
      this.UserForm.patchValue(data);
      this.AddressId = data.address?.userId
      this.Tasks = data.tasks
    }, error => {
      this.toastr.warning("User : " + error.error.title , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    });
  }

  countries: string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)",
    "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
}
