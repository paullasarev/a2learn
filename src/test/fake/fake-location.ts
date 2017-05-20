export class FakeLocation {
  public backCount = 0;
  back() {
    this.backCount++;
  }
}