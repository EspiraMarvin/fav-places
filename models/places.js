export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = { lat: location.lat, lng: location.lng } // { lat: 32, lng: 125}
    this.id = id
  }
}