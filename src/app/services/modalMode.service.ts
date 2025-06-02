import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalModeService {
  private readonly _modalAppears = signal<boolean>(false);
  readonly modalAppears = this._modalAppears;
  private readonly _modalMode = signal<'edit' | 'add'>('add')
  readonly modalMode = this._modalMode;

  setModalMode(mode: 'edit' | 'add'): void {
    this._modalMode.set(mode);
  }

  setModalAppears(appears: boolean): void {
    this._modalAppears.set(appears);
  }
}
