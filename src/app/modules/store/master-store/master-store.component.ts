import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExistingItem } from '@interfaces/item';

import { MasterStoreService } from '@services/master-store.service';
import { AutoUnsubscribeComponent, ToastMessageService } from '@shared/components';

@Component({
  selector: 'app-master-store',
  templateUrl: './master-store.component.html'
})
export class MasterStoreComponent extends AutoUnsubscribeComponent implements OnInit {
  itemMinQuantity = 1;
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'quantity', header: 'Quantity' }
  ];
  availableItems: ExistingItem[] = [];
  formAddItem = this.formAddConfig;
  editingRowValues: ExistingItem = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly masterStoreService: MasterStoreService,
    private readonly toastMessageService: ToastMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchAndShowAvailableItems();
  }

  get formAddConfig(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [this.itemMinQuantity, [Validators.required, Validators.min(1)]]
    });
  }

  fetchAndShowAvailableItems(): void {
    const itemsSub = this.masterStoreService.getItems().subscribe(response => this.availableItems = response.items);
    this.addSubscriptions(itemsSub);
  }

  addNewItem(): void {
    const newItemName = this.formAddItem.get('name').value;
    this.toastMessageService.clear();
    const addItemSub = this.masterStoreService.addItem(this.formAddItem.value).subscribe(() => {
      this.fetchAndShowAvailableItems();
      this.toastMessageService.showSuccessMessages([{
        summary: 'Item Added',
        detail: `New Item '${newItemName}'' added successfully !`
      }]);
      this.formAddItem.reset(this.formAddConfig.value);
    });
    this.addSubscriptions(addItemSub);
  }

  deleteItem(itemId: string, itemName: string): void {
    this.toastMessageService.clear();
    const deleteItemSub = this.masterStoreService.deleteItem(itemId).subscribe(() => {
      this.fetchAndShowAvailableItems();
      this.toastMessageService.showSuccessMessages([{
        summary: 'Item Deleted',
        detail: `Item '${itemName}' deleted successfully !`
      }]);
    });
    this.addSubscriptions(deleteItemSub);
  }

  saveEditItemDetails(item: ExistingItem): void {
    this.editingRowValues = { ...item };
  }

  updateItemDetails(item: ExistingItem, rowIndex: number): void {
    const { id, ...updatedDetails } = item;
    this.toastMessageService.clear();
    const deleteItemSub = this.masterStoreService.updateItem(id, updatedDetails).subscribe(
      () => {
        this.editingRowValues = null;
        this.fetchAndShowAvailableItems();
        this.toastMessageService.showSuccessMessages([{
          summary: 'Item Updated',
          detail: `Item '${item.name}' updated successfully !`
        }]);
      },
      () => this.restoreItemDetails(item, rowIndex)
    );
    this.addSubscriptions(deleteItemSub);
  }

  restoreItemDetails(item: ExistingItem, rowIndex: number): void {
    this.availableItems[rowIndex] = this.editingRowValues;
    this.editingRowValues = null;
  }
}
