import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, first, map, tap } from 'rxjs';
import { Item } from 'src/app/models';
import { ItemsService } from 'src/app/services/items/items.service';
// JUST FOR DEMO PURPOSES
const MOCK_ITEMS: Item[] = new Array(10).fill('').map((item, i) => new Item(11 + i, 'second property ' + i));

const generateItem: () => Item = () => {
  const ref = MOCK_ITEMS[MOCK_ITEMS.length - 1];
  return new Item(ref.prop1 * 5, `Created item with index ${MOCK_ITEMS.length}`);
};

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  itemsLoaded$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  mockItems: Item[] = MOCK_ITEMS;

  get idsToDelete(): string[] {
    return this.mockItems.map(({ id }) => id);
  }

  constructor(private itemsServ: ItemsService) {}

  ngOnInit(): void {
    this.fetchItems(); // READ OPERATION TRIGGERED BY DEFAULT
  }

  generateItem() {
    const itemsLoaded = this.itemsLoaded$.getValue();

    if (itemsLoaded.length === 0) return new Item(61.8, `Created item when array was empty`);

    const [lastItem] = itemsLoaded.slice(-1);
    return new Item(lastItem.prop1 * 5, `Created item with index ${itemsLoaded.length}`);
  }

  fetchItems(): void {
    const request$ = this.itemsServ.getItems().pipe(
      map((res) => (res && res.data) /*.sort((a, b) => b.prop1 - a.prop1)*/ || []),
      first() // unsubscribe after getting the first value to avoid memory leaks
    );
    request$.subscribe((res) => this.itemsLoaded$.next(res));
  }

  createItem(): void {
    const itemToCreate = this.generateItem();

    const request$ = this.itemsServ.createItem(itemToCreate).pipe(
      map((res) => res.data),
      // Re-fetch items from DB to have the latest available data
      tap(() => this.fetchItems()),
      // // Update itemsLoaded
      // tap((createdItem) => {
      //   const itemsLoaded = [...this.itemsLoaded$.getValue(), createdItem];
      //   this.itemsLoaded$.next(itemsLoaded);
      // }),
      first() // unsubscribe after getting the first value to avoid memory leaks
    );

    request$.subscribe((res) => {
      console.log('[created items] ', res);
      // Re-fetch items from DB to have the latest available data
      this.fetchItems();
    });
  }

  editItem = (itemId: string) => this.updateItem(itemId);

  updateItem(itemId: string): void {
    let modifiedItem = [...this.itemsLoaded$.getValue()].find((item) => item.id === itemId);
    if (!modifiedItem) throw Error('Cannot edit an item if it does not exists. Invalid item id');

    modifiedItem = {
      ...modifiedItem,
      // Modify some properties
      prop1: modifiedItem.prop1 < 10 ? 1234567.89 : modifiedItem.prop1 / 2,
      prop2: `Modified from ${(modifiedItem.prop2 || '').slice(0, 13).trim()} - ${Math.round(Math.random() * 100)}`,
    };

    const upsert = false; // We just want to patch (partial modification) the item (Upsert would create/update the whole object)

    const request$ = this.itemsServ.updateItem(modifiedItem, upsert).pipe(
      map((res) => res.data),
      // // Update itemsLoaded
      //   tap((updatedItem) => {
      //     let result = [...this.itemsLoaded$.getValue()].map((item) => {
      //       if (item.id !== updatedItem.id) return updatedItem;
      //       return item;
      //     });
      //     this.itemsLoaded$.next(result);
      //   }),
      first() // unsubscribe after getting the first value to avoid memory leaks
    );
    request$.subscribe((res) => {
      console.log('[updateItems response data] ', res);
      // Re-fetch items from DB to have the latest available data
      this.fetchItems();
    });
  }

  deleteItem(idToDelete: string): void {
    const request$ = this.itemsServ.deleteOneById(idToDelete).pipe(
      map((res) => res.data),
      // tap((deletedItem) => {
      //   let result = this.itemsLoaded$.getValue().filter((item) => item.id !== deletedItem.id);
      //   this.itemsLoaded$.next(result);
      // }),
      first() // unsubscribe after getting the first value to avoid memory leaks
    );
    request$.subscribe((res) => {
      console.log('[deleteItems response data] ', res);
      // Re-fetch items from DB to have the latest available data
      this.fetchItems();
    });
  }
}
