import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoBlogComponent } from './contenido-blog.component';

describe('ContenidoBlogComponent', () => {
  let component: ContenidoBlogComponent;
  let fixture: ComponentFixture<ContenidoBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
