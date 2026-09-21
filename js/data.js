const COUNTIES = [
  "Nairobi", "Kiambu", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu",
  "Machakos", "Kajiado", "Nyeri", "Kisii", "Meru", "Kilifi"
];

const PROFILES = [
  { id: 1, name: "Amina", age: 26, county: "Nairobi", distance: 3, tribe: "Swahili", religion: "Muslim", mode: "Professional", bio: "Westlands weekends, chai over chaos. Looking for someone who texts back.", interests: ["Afrobeats", "Brunch", "Travel"] },
  { id: 2, name: "Brian", age: 29, county: "Kiambu", distance: 8, tribe: "Kikuyu", religion: "Christian", mode: "Professional", bio: "Product designer. Saturdays at Karura. No situationships.", interests: ["Hiking", "Design", "Football"] },
  { id: 3, name: "Wanjiku", age: 24, county: "Nairobi", distance: 5, tribe: "Kikuyu", religion: "Christian", mode: "Church", bio: "Worship team + data analytics. Soft life, strong faith.", interests: ["Gospel", "Books", "Cooking"] },
  { id: 4, name: "Otieno", age: 31, county: "Kisumu", distance: 12, tribe: "Luo", religion: "Christian", mode: "Professional", bio: "Lakeside kid in the city. Tilapia dates > club noise.", interests: ["Music", "Fishing", "Startups"] },
  { id: 5, name: "Zawadi", age: 23, county: "Mombasa", distance: 4, tribe: "Mijikenda", religion: "Christian", mode: "Student", bio: "Coast vibes. Swahili lessons optional, sunset walks mandatory.", interests: ["Beach", "Photography", "Poetry"] },
  { id: 6, name: "Kevin", age: 27, county: "Nakuru", distance: 18, tribe: "Kalenjin", religion: "Christian", mode: "Student", bio: "Runner. If you can keep up on a Sunday jog, we can talk.", interests: ["Running", "Coffee", "Tech"] },
  { id: 7, name: "Faith", age: 28, county: "Uasin Gishu", distance: 22, tribe: "Kalenjin", religion: "Christian", mode: "Church", bio: "Eldoret mornings. Looking for kind, not loud.", interests: ["Church", "Farming", "Travel"] },
  { id: 8, name: "Hassan", age: 30, county: "Nairobi", distance: 6, tribe: "Somali", religion: "Muslim", mode: "Professional", bio: "Eastleigh to Kilimani. Halal hangouts and honest conversation.", interests: ["Business", "Cars", "Food"] }
];

function initials(name) {
  return name.slice(0, 2).toUpperCase();
}
