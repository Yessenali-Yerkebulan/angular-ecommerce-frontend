import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we already have the itemm in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0){
      // find the item in the cart based on item id

      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id == theCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);

    }

    if(alreadyExistsInCart){
      // increment the quantity
      existingCartItem.quantity++;
    }else{
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and toatl quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    throw new Error('Method not implemented.');
  }


}
