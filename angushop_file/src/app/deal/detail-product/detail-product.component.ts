import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { CookieService } from '../../lib/service/cookie.service';

import { Cookie } from 'ng2-cookies';
import { MatSnackBar } from '@angular/material';

import { Deal } from '../../lib/service/data/deal';
import { dealService } from '../../lib/service/deal.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailDealComponent implements OnInit {
    private productName: string;
    private product: Deal;
    private cloneProduct: Deal[] = [];
    private productImage: string;
    private selectedImage: any;
    private objectOrder: any;
    private productsOrder = [];
    private productCompare = [];
    private procustCount: number = 0;

    productState: boolean = false;
    loadingState: boolean = true;    

    constructor(
        private activeRoute: ActivatedRoute,
        private productService: dealService,
        public snackBar: MatSnackBar,
        private cookie: CookieService
    ){
        this.productsOrder = this.cookie['productsOrder'];
        this.productCompare = this.cookie['arrCompare'];
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.productName = params["detail"];
            this.productService.getSlugProduct(this.productName).subscribe(product => {
                this.product = product;
                this.productState = true;
                this.loadingState = false;
                this.productImage = product.image;

                // Set Object Order Product
                this.objectOrder = {
                    id: product.id,
                    slug: product.slug,
                    quantity: 1,
                    originalPrice: product.originalPrice,
                    dealPrice: product.dealPrice,                    
                    image: product.image,
                    productName: product.productName
                };

                // Init Demo Image
                this.selectedImage = _.find(product.gallery, (o) => { 
                    return o.images == product.image
                });

                // Init Counter product button
                this.buttonCounter(product.id);
            });
        });
    }
    
    // Button Counter
    buttonCounter(idProduct: number){
        var findObj = _.find(this.cookie['productsOrder'], ['id', idProduct]);
        if(findObj != undefined){
            this.procustCount = findObj.quantity;        
        }
    }

    // Add Cart to Cookie
    addCart(cName,cValue) {
        let obj = _.find(this.productsOrder, ['id', this.product.id]);
        if(obj == undefined){
            this.productsOrder.push(this.objectOrder);
        }else{
            obj.quantity = obj.quantity + 1;             
        }
        this.buttonCounter(this.product.id);
        this.cookie.addCookie(cName, JSON.stringify(cValue));
        this.openSnackBar(this.product.productName, 'Added to Cart');
    }

    // Snack Bar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }
    
    // Image Gallery
    selectImage(gallery){
        this.selectedImage = gallery;
        this.productImage = gallery.images;
    }
}
