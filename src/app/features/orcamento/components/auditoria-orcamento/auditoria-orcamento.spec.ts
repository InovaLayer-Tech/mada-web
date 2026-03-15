import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaOrcamento } from './auditoria-orcamento';

describe('AuditoriaOrcamento', () => {
  let component: AuditoriaOrcamento;
  let fixture: ComponentFixture<AuditoriaOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaOrcamento],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditoriaOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
