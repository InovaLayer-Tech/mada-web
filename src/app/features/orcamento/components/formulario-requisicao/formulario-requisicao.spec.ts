import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRequisicao } from './formulario-requisicao';

describe('FormularioRequisicao', () => {
  let component: FormularioRequisicao;
  let fixture: ComponentFixture<FormularioRequisicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRequisicao],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioRequisicao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
