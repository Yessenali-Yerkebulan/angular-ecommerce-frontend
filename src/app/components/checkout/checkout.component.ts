import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService){}

  ngOnInit(): void{
      this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: ['']
        }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']
        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: ['']
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
        })
      });


      // populate credit card months

      const startMonth: number = new Date().getMonth()+1;
      console.log("startMonth: "+startMonth);

      this.shopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log("Retrieved credit card mohths: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
      );



      // populate credit card years

      this.shopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrieved credit card years: " + JSON.stringify(data));
          this.creditCardYears = data;
        }
      );

      // populate countries
      this.shopFormService.getCountries().subscribe(
        data => {
          console.log("Retrieved countries: " +JSON.stringify(data));
          this.countries = data;
        }
      )


  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
}

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }
}
