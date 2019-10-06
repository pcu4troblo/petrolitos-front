import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  
  profile: FormGroup;
  newProfile: any = {};
  user: any ;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ServicesService
    ) { }

  ngOnInit() {
    this.profile = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      social: new FormControl()
    });

    this.user = JSON.parse(localStorage.getItem("user"));
    this.user = {
      email: this.user.email
    }
    console.log(this.user);
    
  }

  onSubmit(){
    
    this.service.updateProfile(this.profile.value).subscribe(res => {
      console.log(res);
      this.newProfile = {
        name: this.profile.value.name,
        email: this.profile.value.email
      }
      localStorage.setItem('user', JSON.stringify(this.newProfile));
      this.router.navigate([""])
    })
  }

}
