import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactInfo } from '../../models/resume.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly name = input.required<string>();
  readonly headline = input.required<string>();
  readonly contact = input.required<ContactInfo>();
  readonly summary = input.required<string>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mapOpen = signal(false);

  protected readonly mapEmbedUrl = computed<SafeResourceUrl>(() => {
    const query = encodeURIComponent(this.contact().location);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${query}&z=11&output=embed`,
    );
  });

  protected mapExternalUrl(): string {
    const query = encodeURIComponent(this.contact().location);
    return `https://maps.google.com/maps?q=${query}`;
  }

  protected phoneHref(phone: string): string {
    return 'tel:' + phone.replace(/[^0-9+]/g, '');
  }

  protected openMap(): void {
    this.mapOpen.set(true);
  }

  protected closeMap(): void {
    this.mapOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.mapOpen()) {
      this.closeMap();
    }
  }
}
