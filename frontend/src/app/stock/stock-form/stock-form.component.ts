import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common';
import { CategoryResponse, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  editMode = false;
  imageSrc!: string;
  file!: File;
  hasHistory = false;
  isSubmitted = false;

  categories: CategoryResponse[] = [];

  @ViewChild('productForm') productForm!: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private networkService: NetworkService,
  ) {
    // important. variables must be declared.
    this.hasHistory = this.router.navigated;
  }

  async ngOnInit(): Promise<void> {
    await this.feedCategories();
    this.activatedRoute.params.subscribe(
      params => {
        const id = params.id;
        if (id) {
          if (!Number(id)) {
            this.goBack();
            return;
          }
          this.editMode = true;
          this.feedProduct(id);
        }
      }
    );
  }

  feedProduct(id: number) {
    this.networkService.getProductById(id.toString()).subscribe(
      result => {

        console.log(JSON.stringify(result));

        const { productId, name, price, stock, image, categoryName } = { ...result };
        // ** find same flitter. but find will get one element
        const categoryId = this.categories.find(category => category.name === categoryName)?.categoryId
        this.imageSrc = image;
    


        this.productForm.setValue({ productId, name, price, stock, categoryId });

      },
      error => {
        alert('Product ID Not Found');
        this.goBack();
      }
    );
  }

  feedCategories(): void {
    this.networkService.getCategories().subscribe(
      result => {
        this.categories = result;
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }


  async onSubmitForm(ngForm: NgForm) {
    if (ngForm.invalid) {
      return;
    }

    let product: Product = {
      ...ngForm.value,
      image: this.file
    }

    try {
      let message: string;
      if (this.editMode) {
        await this.networkService.editProduct(product).toPromise();
        message = 'Successfully edited product';
      } else {
        await this.networkService.addProduct(product).toPromise();
        message = 'Successfully created product';
      }
      this.isSubmitted = true;
      this.goBack();
      alert(message)
    } catch (error) {
      alert('Network failed')
    }
  }

  previewImage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.file = files[0]; // for upload to server
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
    }
  }

  onClickBack(): void {
    this.goBack()
  }

  goBack(): void {
    if (this.hasHistory) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  isBase64(image: string): boolean {
    return image.startsWith("data:");
  }
}
