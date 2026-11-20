const filenames={"/":"index.html","/about":"about.html","/menu":"menu.html","/bulk-orders":"bulk-orders.html","/cart":"cart.html","/checkout":"checkout.html","/contact":"contact.html","/404":"404.html"};
function localLinks(html){
 return html.replace(/href="(\/[^"]*)"/g,(original,url)=>{
  const [path,query]=url.split('?');
  return filenames[path]?'href="'+filenames[path]+(query?'?'+query:'')+'"':original;
 }).replaceAll('src="/images/','src="public/images/');
}
// Public business information. Use international format for phone and WhatsApp.
// Add approved reviews as {name, en, ta, hi}; show only with customer permission.
const shop = {
  name: 'Sharmaji Foods', samplePrices: false, maxGuests: 50, minChapatis: 15, extraSabjiPrice: 100,
  prices: {chapati: 25, lauki: 0, aloo: 0, gobi: 0, dahi: 10, raita: 25},
  deliveryCharge: 40, deliveryAreas: [], phone: '', whatsapp: '+919626750414', email: '',
  pickupAddress: '', leadHours: 0, reviews: []
};

const rows = `Minimum chapati order|குறைந்தபட்ச சப்பாத்தி எண்ணிக்கை|चपातियों का न्यूनतम ऑर्डर
Extra sabji|கூடுதல் சப்ஜி|अतिरिक्त सब्ज़ी
Additional sabjis (optional)|கூடுதல் சப்ஜிகள் (விருப்பம்)|अतिरिक्त सब्ज़ियाँ (वैकल्पिक)
Order on WhatsApp|வாட்ஸ்ஆப்பில் ஆர்டர் செய்யுங்கள்|WhatsApp पर ऑर्डर करें
Order notification queued for the kitchen.|சமையலறைக்கான ஆர்டர் அறிவிப்பு அனுப்ப வரிசையில் உள்ளது.|रसोई को ऑर्डर की सूचना भेजने के लिए दर्ज हो गई है।
Complimentary|இலவசம்|मुफ़्त
Choose one complimentary sabji|ஒரு இலவச சப்ஜியைத் தேர்ந்தெடுங்கள்|एक मुफ़्त सब्ज़ी चुनें
Dahi packet|தயிர் பாக்கெட்|दही का पैकेट
Raita|ராய்த்தா|रायता
Seasoned curd to serve alongside your chapatis.|சப்பாத்தியுடன் சுவைக்க மசாலா கலந்த தயிர்.|चपातियों के साथ परोसने के लिए मसालेदार दही।
per packet|ஒரு பாக்கெட்டுக்கு|प्रति पैकेट
Optional add-ons|விருப்பத் துணை உணவுகள்|वैकल्पिक अतिरिक्त व्यंजन
Each chapati includes your choice of lauki, aloo or gobi sabji.|ஒவ்வொரு சப்பாத்தியுடனும் சுரைக்காய், உருளைக்கிழங்கு அல்லது காலிஃபிளவர் சப்ஜியில் ஒன்று இலவசம்.|हर चपाती के साथ लौकी, आलू या गोभी में से एक सब्ज़ी मुफ़्त है।
WhatsApp will open with your order. Tap Send to message the kitchen.|உங்கள் ஆர்டருடன் வாட்ஸ்ஆப் திறக்கும். அனுப்பு என்பதைத் தொடுங்கள்.|आपके ऑर्डर के साथ WhatsApp खुलेगा। रसोई को संदेश भेजने के लिए भेजें दबाएँ।
Place Order|ஆர்டர் செய்யுங்கள்|ऑर्डर करें
Order ready to send|அனுப்பத் தயாரான ஆர்டர்|ऑर्डर भेजने के लिए तैयार है
Choose the kitchen’s contact in WhatsApp and tap Send to place this order.|வாட்ஸ்ஆப்பில் சமையலறையின் தொடர்பைத் தேர்ந்தெடுத்து ஆர்டரை அனுப்புங்கள்.|WhatsApp में रसोई का संपर्क चुनें और ऑर्डर भेजने के लिए भेजें दबाएँ।
Tap Send in WhatsApp to place this order with the kitchen.|ஆர்டரைச் சமையலறைக்கு அனுப்ப வாட்ஸ்ஆப்பில் அனுப்பு என்பதைத் தொடுங்கள்.|रसोई को ऑर्डर भेजने के लिए WhatsApp में भेजें दबाएँ।
Review your order, then send it to the kitchen on WhatsApp.|உங்கள் ஆர்டரைச் சரிபார்த்து வாட்ஸ்ஆப்பில் சமையலறைக்கு அனுப்புங்கள்.|अपना ऑर्डर जाँचें और फिर WhatsApp पर रसोई को भेजें।
Home|முகப்பு|होम
About Us|எங்களைப் பற்றி|हमारी कहानी
Food Menu|உணவுப் பட்டியல்|मेन्यू
Bulk Orders|மொத்த ஆர்டர்|सामूहिक ऑर्डर
Contact|தொடர்பு|संपर्क
Cart|கூடை|कार्ट
Checkout|முன்பதிவு விவரங்கள்|बुकिंग विवरण
Confirmation|கோரிக்கை விவரம்|अनुरोध की स्थिति
A Rajasthani kitchen in Tamil Nadu|தமிழ்நாட்டில் ஒரு ராஜஸ்தானி சமையலறை|तमिलनाडु में एक राजस्थानी रसोई
Homemade Goodness for|வீட்டுச் சுவையுடன்|हर अवसर के लिए
Every Occasion|ஒவ்வொரு விழாவும்|घर का स्वाद
Hand-rolled chapatis and homestyle sabjis for gatherings of up to 50.|50 பேர் வரையிலான விழாக்களுக்கு கையால் திரட்டிய சப்பாத்திகளும் வீட்டுச் சுவை சப்ஜிகளும்.|50 मेहमानों तक के लिए हाथ से बेली चपातियाँ और घर जैसी सब्ज़ियाँ।
Plan an Order|ஆர்டரைத் திட்டமிடுங்கள்|ऑर्डर बनाएँ
Explore Menu|உணவுகளைப் பாருங்கள்|मेन्यू देखें
From Our Kitchen|எங்கள் சமையலறையிலிருந்து|हमारी रसोई से
View full menu|முழுப் பட்டியல்|पूरा मेन्यू देखें
Fresh Chapatis|சப்பாத்தி|ताज़ी चपातियाँ
Lauki Sabji|சுரைக்காய் சப்ஜி|लौकी की सब्ज़ी
Aloo Sabji|உருளைக்கிழங்கு சப்ஜி|आलू की सब्ज़ी
Gobi Sabji|காலிஃபிளவர் சப்ஜி|गोभी की सब्ज़ी
Dahi|தயிர்|दही
Soft whole-wheat flatbreads, rolled by hand.|கையால் திரட்டிய மென்மையான கோதுமைச் சப்பாத்தி.|हाथ से बेली हुई नरम गेहूँ की चपातियाँ।
Tender bottle gourd cooked with gentle spices.|மிதமான மசாலாவில் வெந்த சுரைக்காய்.|हल्के मसालों में पकी मुलायम लौकी।
Golden potatoes tossed with warming spices.|மணமிக்க மசாலாவில் பொன்னிற உருளைக்கிழங்கு.|सुगंधित मसालों में पके सुनहरे आलू।
Cauliflower florets with a homestyle masala.|வீட்டுச் சுவை மசாலாவில் காலிஃபிளவர்.|घरेलू मसाले में पकी फूलगोभी।
A cooling side of plain curd.|கூடவே குளிர்ச்சியான தயிர்.|साथ में सादा ठंडा दही।
Order Now|ஆர்டர் செய்யுங்கள்|ऑर्डर करें
Our family story|எங்கள் குடும்பக் கதை|हमारे परिवार की कहानी
It started at our chai shop.|எங்கள் தேநீர்க் கடையில் தொடங்கிய கதை.|शुरुआत हमारी चाय की दुकान से हुई।
When our family from Rajasthan made Tamil Nadu home, our chapatis came with us. At our chai shop, customers began ordering them with sabji for their own gatherings. Those orders grew into Sharmaji Foods.|ராஜஸ்தானிலிருந்து தமிழ்நாட்டிற்கு வந்தபோது எங்கள் சப்பாத்தி செய்முறையையும் கொண்டு வந்தோம். எங்கள் தேநீர்க் கடை வாடிக்கையாளர்கள் தங்கள் விழாக்களுக்குச் சப்பாத்தியும் சப்ஜியும் கேட்கத் தொடங்கினர். அவ்வாறே ஷர்மாஜி ஃபுட்ஸ் உருவானது.|जब हमारा राजस्थानी परिवार तमिलनाडु में बसा, तो अपनी रसोई का स्वाद भी साथ लाया। चाय की दुकान पर लोग अपनी दावतों के लिए चपाती और सब्ज़ी मँगाने लगे। उन्हीं ऑर्डरों से शर्मा जी फूड्स की शुरुआत हुई।
Meet the family|எங்களை அறியுங்கள்|हमारी कहानी पढ़ें
Gather around our table.|எங்கள் உணவுடன் ஒன்று கூடுங்கள்.|हमारी थाली, आपकी महफ़िल।
Choose chapatis, pick the sabjis and add dahi for your guests.|உங்கள் விருந்தினர்களுக்குச் சப்பாத்தி, சப்ஜி மற்றும் தயிரைத் தேர்வு செய்யுங்கள்.|अपने मेहमानों के लिए चपातियाँ, सब्ज़ियाँ और दही चुनें।
Our Food Menu|எங்கள் உணவுப் பட்டியல்|हमारा मेन्यू
All dishes|அனைத்து உணவுகளும்|सभी व्यंजन
Chapatis|சப்பாத்திகள்|चपातियाँ
Sabjis|சப்ஜிகள்|सब्ज़ियाँ
Sides|துணை உணவுகள்|साथ में
Select dish|உணவைத் தேர்வு செய்|व्यंजन चुनें
per chapati|ஒரு சப்பாத்திக்கு|प्रति चपाती
per portion|ஒரு பரிமாறலுக்கு|प्रति परोस
Sample pricing. The kitchen will confirm the final quote.|மாதிரி விலைகள். இறுதி விலையைச் சமையலறை உறுதி செய்யும்.|ये नमूना कीमतें हैं। अंतिम राशि रसोई से तय होगी।
Plan your gathering|உங்கள் விழாவைத் திட்டமிடுங்கள்|अपनी दावत की योजना बनाएँ
Build your menu|உங்கள் உணவைத் தேர்வு செய்யுங்கள்|अपना मेन्यू बनाएँ
Guests|விருந்தினர்கள்|मेहमान
Chapati quantity|சப்பாத்தி எண்ணிக்கை|चपातियों की संख्या
Sabji portions|சப்ஜி அளவுகள்|सब्ज़ी के परोस
Add dahi|தயிர் சேர்க்கவும்|दही जोड़ें
Your estimate|மதிப்பீடு|अनुमानित राशि
Food subtotal|உணவுத் தொகை|भोजन का उप-योग
Delivery|டெலிவரி|डिलीवरी
Pickup|நேரில் பெறுதல்|पिकअप
Total|மொத்தம்|कुल
Add to cart|கூடையில் சேர்|कार्ट में जोड़ें
Update cart|கூடையைப் புதுப்பி|कार्ट अपडेट करें
One event per cart. You can adjust every quantity.|ஒரு கூடைக்கு ஒரு விழா. ஒவ்வொரு உணவின் அளவையும் மாற்றலாம்.|एक कार्ट में एक आयोजन रखें। हर व्यंजन की मात्रा बदल सकते हैं।
Choose at least one food item.|குறைந்தது ஒரு உணவையாவது தேர்வு செய்யுங்கள்.|कम से कम एक व्यंजन चुनें।
Your cart|உங்கள் கூடை|आपका कार्ट
Your cart is empty.|உங்கள் கூடை காலியாக உள்ளது.|आपका कार्ट खाली है।
Edit menu|உணவை மாற்று|मेन्यू बदलें
Remove order|ஆர்டரை நீக்கு|ऑर्डर हटाएँ
Continue to checkout|விவரங்களை நிரப்புங்கள்|बुकिंग विवरण भरें
Your gathering|உங்கள் விழா|आपका आयोजन
Delivery fee is added at checkout.|டெலிவரிக் கட்டணம் அடுத்த கட்டத்தில் சேர்க்கப்படும்.|डिलीवरी शुल्क अगले चरण में जुड़ता है।
Order details|ஆர்டர் விவரங்கள்|ऑर्डर विवरण
Your name|உங்கள் பெயர்|आपका नाम
Mobile number|கைபேசி எண்|मोबाइल नंबर
Occasion|நிகழ்ச்சி|अवसर
Birthday party|பிறந்தநாள் விழா|जन्मदिन
Annual day|ஆண்டு விழா|वार्षिकोत्सव
Family gathering|குடும்ப விழா|पारिवारिक समारोह
Office meeting|அலுவலகக் கூட்டம்|ऑफ़िस मीटिंग
Religious function|ஆன்மிக நிகழ்வு|धार्मिक कार्यक्रम
Other event|பிற நிகழ்ச்சி|अन्य आयोजन
Event date|நிகழ்ச்சித் தேதி|आयोजन की तारीख
Required time (IST)|தேவையான நேரம் (IST)|समय (IST)
Receive your order|உணவைப் பெறும் முறை|ऑर्डर कैसे लेंगे
Service area|சேவைப் பகுதி|सेवा क्षेत्र
Delivery address|டெலிவரி முகவரி|डिलीवरी का पता
Special instructions (optional)|சிறப்புக் குறிப்புகள் (விருப்பம்)|विशेष निर्देश (वैकल्पिक)
Send booking request|முன்பதிவுக் கோரிக்கையை அனுப்பு|बुकिंग अनुरोध भेजें
Sending…|அனுப்பப்படுகிறது…|भेज रहे हैं…
The kitchen will confirm availability and the final amount with you.|கிடைக்கும் நேரத்தையும் இறுதித் தொகையையும் சமையலறை உங்களிடம் உறுதி செய்யும்.|रसोई आपसे उपलब्धता और अंतिम राशि की पुष्टि करेगी।
Choose a later event time.|பிந்தைய தேதி அல்லது நேரத்தைத் தேர்வு செய்யுங்கள்.|आगे की तारीख या समय चुनें।
We could not save your request. Your cart is still here. Please retry.|கோரிக்கையைச் சேமிக்க இயலவில்லை. உங்கள் கூடை உள்ளது. மீண்டும் முயலுங்கள்.|अनुरोध सहेजा नहीं जा सका। आपका कार्ट सुरक्षित है। फिर कोशिश करें।
Booking request received|முன்பதிவுக் கோரிக்கை பெறப்பட்டது|बुकिंग अनुरोध प्राप्त हुआ
Reference|கோரிக்கை எண்|संदर्भ
Share on WhatsApp|வாட்ஸ்ஆப்பில் அனுப்புங்கள்|WhatsApp पर भेजें
Copy order summary|ஆர்டர் விவரத்தை நகலெடு|ऑर्डर विवरण कॉपी करें
Copied|நகலெடுக்கப்பட்டது|कॉपी हो गया
Order summary|ஆர்டர் சுருக்கம்|ऑर्डर सारांश
No recent booking on this device.|இந்தச் சாதனத்தில் அண்மைய முன்பதிவு இல்லை.|इस डिवाइस पर कोई हाल की बुकिंग नहीं है।
Our kitchen|எங்கள் சமையலறை|हमारी रसोई
Food & hygiene|உணவும் சுகாதாரமும்|भोजन और स्वच्छता
Our chapatis contain wheat and our dahi contains milk. Tell us about allergies when you book so the family can discuss ingredients, shared equipment and packing before confirming.|சப்பாத்தியில் கோதுமையும் தயிரில் பாலும் உள்ளன. ஒவ்வாமை இருந்தால் முன்பதிவின்போது குறிப்பிடுங்கள். பொருட்கள், பகிரப்பட்ட பாத்திரங்கள் மற்றும் பேக்கிங் பற்றிப் பேசலாம்.|चपाती में गेहूँ और दही में दूध होता है। बुकिंग के समय एलर्जी बताएँ ताकि सामग्री, साझा बर्तन और पैकिंग पर पहले बात हो सके।
Customer reviews|வாடிக்கையாளர் கருத்துகள்|ग्राहकों की राय
Customer reviews will appear here as families share their experiences.|குடும்பங்கள் தங்கள் அனுபவங்களைப் பகிரும்போது அவை இங்கே தோன்றும்.|परिवार अपने अनुभव साझा करेंगे तो उनकी राय यहाँ दिखेगी।
Contact our kitchen|எங்கள் சமையலறையைத் தொடர்பு கொள்ளுங்கள்|हमसे संपर्क करें
Planning a gathering? Send your details with a booking request so our family can follow up.|விழாவைத் திட்டமிடுகிறீர்களா? உங்கள் விவரங்களுடன் கோரிக்கையை அனுப்புங்கள். எங்கள் குடும்பம் தொடர்பு கொள்ளும்.|आयोजन की तैयारी है? बुकिंग अनुरोध में विवरण भेजें ताकि हमारा परिवार आपसे संपर्क कर सके।
Call the kitchen|கைபேசியில் அழைக்க|फ़ोन करें
Email the kitchen|மின்னஞ்சல் அனுப்ப|ईमेल भेजें
Service locations|சேவைப் பகுதிகள்|सेवा क्षेत्र
Tamil Nadu|தமிழ்நாடு|तमिलनाडु
Delivery coverage and pickup details are confirmed for each booking.|ஒவ்வொரு முன்பதிவிற்கும் டெலிவரி பகுதியும் நேரில் பெறும் விவரங்களும் உறுதி செய்யப்படும்.|हर बुकिंग के लिए डिलीवरी क्षेत्र और पिकअप का पता तय किया जाएगा।
Page not found|பக்கம் கிடைக்கவில்லை|पृष्ठ नहीं मिला
Back to home|முகப்புக்குச் செல்|होम पर लौटें
Contact Us|தொடர்பு கொள்ளுங்கள்|संपर्क करें
Your request is saved. Send the prepared message in WhatsApp to share it with the kitchen.|கோரிக்கை சேமிக்கப்பட்டது. அதைச் சமையலறையுடன் பகிர வாட்ஸ்ஆப் செய்தியை அனுப்புங்கள்.|अनुरोध सहेजा गया। रसोई से साझा करने के लिए WhatsApp में तैयार संदेश भेजें।
Pickup address will be confirmed with your booking.|நேரில் பெறும் முகவரி முன்பதிவுடன் உறுதி செய்யப்படும்.|पिकअप का पता बुकिंग के साथ तय होगा।
Delivery area will be checked before the booking is confirmed.|முன்பதிவுக்கு முன் டெலிவரி பகுதி சரிபார்க்கப்படும்.|बुकिंग तय करने से पहले डिलीवरी क्षेत्र जाँचा जाएगा।
Orders for 1–50 guests|1–50 பேருக்கான ஆர்டர்கள்|1–50 मेहमानों के लिए
Menu|பட்டியல்|मेन्यू
Language|மொழி|भाषा
Your order|உங்கள் ஆர்டர்|आपका ऑर्डर
Please check the form and try again.|விவரங்களைச் சரிபார்த்து மீண்டும் முயலுங்கள்.|विवरण जाँचकर फिर कोशिश करें।
Too many requests. Please try again later.|அதிக கோரிக்கைகள். சிறிது நேரம் கழித்து முயலுங்கள்.|कई अनुरोध आ चुके हैं। कुछ देर बाद कोशिश करें।
Skip to content|உள்ளடக்கத்துக்குச் செல்ல|मुख्य सामग्री पर जाएँ`;
const dictionary = Object.fromEntries(rows.split('\n').map(row => { const [en,ta,hi]=row.split('|'); return [en,{en,ta,hi}]; }));
const translate = (lang,key) => dictionary[key]?.[lang] || key;

const dishes = [
 ['chapati','Fresh Chapatis','Soft whole-wheat flatbreads, rolled by hand.','Chapatis'],
 ['lauki','Lauki Sabji','Tender bottle gourd cooked with gentle spices.','Sabjis'],
 ['aloo','Aloo Sabji','Golden potatoes tossed with warming spices.','Sabjis'],
 ['gobi','Gobi Sabji','Cauliflower florets with a homestyle masala.','Sabjis'],
 ['dahi','Dahi packet','A cooling side of plain curd.','Sides'],
 ['raita','Raita','Seasoned curd to serve alongside your chapatis.','Sides']
];
const occasions=['Birthday party','Annual day','Family gathering','Office meeting','Religious function','Other event'];
const freshPlan=()=>({guests:10,extraSabjis:[],items:{chapati:30,lauki:0,aloo:30,gobi:0,dahi:0,raita:0}});
const amount=plan=>dishes.reduce((sum,[id])=>sum+(plan.items[id]||0)*shop.prices[id],0)+(plan.extraSabjis||[]).length*shop.extraSabjiPrice;
const rupees=n=>'₹'+new Intl.NumberFormat('en-IN').format(n);
const sabjiIds=['lauki','aloo','gobi'];
const quantityIds=['chapati','dahi','raita'];
function chooseSabji(items,id){
 for(const key of sabjiIds)items[key]=key===id?items.chapati:0;
}
function validPlan(p){
 if(!p||!Number.isInteger(p.guests)||p.guests<1||p.guests>shop.maxGuests||!p.items)return false;
 const items=p.items;
 const extras=p.extraSabjis===undefined?[]:p.extraSabjis;
 if(!Array.isArray(extras)||new Set(extras).size!==extras.length||!extras.every(id=>sabjiIds.includes(id)&&items[id]===0))return false;
 return dishes.every(([id])=>Number.isInteger(items[id])&&items[id]>=0&&items[id]<=500)
  &&items.chapati>=shop.minChapatis&&sabjiIds.filter(id=>items[id]>0).length===1
  &&sabjiIds.some(id=>items[id]===items.chapati);
}
function restoreCart(p){
 if(validPlan(p))return p;
 if(!p?.items||p.items.raita!==undefined)return null;
 const items={...p.items,raita:0};
 const selected=sabjiIds.find(id=>items[id]>0)||'aloo';
 chooseSabji(items,selected);
 const cart={guests:p.guests,items};
 return validPlan(cart)?cart:null;
}
const whatsappOrderUrl=(o,t)=>'https://wa.me/'+shop.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(summary(o,t));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const indianDate=(time=Date.now())=>new Date(time+19800000).toISOString().slice(0,10);
function futureEvent(date,time,now=Date.now()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return false;
 const stamp=Date.parse(date+'T'+time+':00+05:30');
 return Number.isFinite(stamp)&&indianDate(stamp)===date&&stamp>now+shop.leadHours*3600000;
}
const orderTotal=o=>amount(o.plan)+(o.method==='Delivery'?shop.deliveryCharge:0);
function summary(o,t=k=>k){
 const fields=[[t('Reference'),o.id],[t('Your name'),o.name],[t('Mobile number'),o.phone],[t('Guests'),o.plan.guests],[t('Occasion'),t(o.occasion)],[t('Event date'),o.date],[t('Required time (IST)'),o.time],[t('Receive your order'),t(o.method)]];
 if(o.method==='Delivery')fields.push([t('Delivery address'),[o.address,o.area].filter(Boolean).join(', ')]);
 const lines=dishes.filter(([id])=>o.plan.items[id]>0).map(([id,name])=>(o.prices||shop.prices)[id]===0?t(name)+' — '+t('Complimentary'):t(name)+' × '+o.plan.items[id]+' — '+rupees(o.plan.items[id]*(o.prices||shop.prices)[id]));
 for(const id of o.plan.extraSabjis||[]){
  const name=dishes.find(d=>d[0]===id)[1];
  lines.push(t('Extra sabji')+' · '+t(name)+' — '+rupees(o.extraSabjiPrice??shop.extraSabjiPrice));
 }
 return [shop.name+' · '+t('Your order'),...fields.map(([k,v])=>k+': '+v),'',...lines,t('Delivery')+': '+rupees(o.fee??0),t('Total')+': '+rupees(o.total??orderTotal(o)),o.notes?'\n'+t('Special instructions (optional)')+': '+o.notes:'',shop.samplePrices?t('Sample pricing. The kitchen will confirm the final quote.'):''].filter(Boolean).join('\n');
}

const routes={'/':'Home','/about':'About Us','/menu':'Food Menu','/bulk-orders':'Bulk Orders','/cart':'Cart','/checkout':'Checkout','/contact':'Contact Us','/404':'Page not found'};
const icons={
 pin:'<rect x="5.8" y="7.5" width="12.4" height="9" rx="2"/><path d="M5.8 10.5H2a1.5 1.5 0 0 0 0 3h3.8m12.4-3H22a1.5 1.5 0 0 1 0 3h-3.8M9 10h5"/>',
 bag:'<path d="M5 7.5h14l1 13H4l1-13Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/>',
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
 globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 leaf:'<path d="M5 17c-5-10 8-14 16-13-1 9-6 20-16 13Zm0 0L16 8"/>',
 people:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-3c0-7 14-7 14 0v3m0-15c5 0 5 6 0 6m2 2q4 0 4 6"/>'
};
const icon=k=>`<svg aria-hidden="true" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[k]}</svg>`;
const bloom='<span aria-hidden="true" class="bloom">❧</span>';
const logo=`<a href="/" class="brand" aria-label="Sharmaji Foods">${icon('pin')}<span>Sharmaji Foods</span></a>`;
const btn=(url,label,cls='primary')=>`<a class="btn ${cls}" href="${url}">${label}</a>`;
const note=t=>shop.samplePrices?`<p class="note">${t('Sample pricing. The kitchen will confirm the final quote.')}</p>`:'';
const card=(d,t,full)=>{let [id,title,desc,group]=d;return `<a class="dish" data-group="${group}" href="/bulk-orders?dish=${id}"><div class="dish-image">${id==='raita'?'<span class="raita-tile" aria-hidden="true">🥣</span>':`<img src="/images/${id}.webp" alt="${t(title)}" loading="lazy">`}</div><div class="dish-info"><div><h3>${t(title)}</h3>${full?`<p>${t(desc)}</p><small>${sabjiIds.includes(id)?t('Complimentary'):rupees(shop.prices[id])+' / '+t(id==='chapati'?'per chapati':id==='dahi'?'per packet':'per portion')}</small>`:''}</div><span class="add" aria-label="${t('Select dish')}">+</span></div></a>`};
const story='When our family from Rajasthan made Tamil Nadu home, our chapatis came with us. At our chai shop, customers began ordering them with sabji for their own gatherings. Those orders grew into Sharmaji Foods.';
function home(t){
 return `<section class="hero"><div class="hero-copy"><p class="eyebrow"><i></i>${t('A Rajasthani kitchen in Tamil Nadu')}</p><h1>${t('Homemade Goodness for')} <em>${t('Every Occasion')}</em></h1><p class="hero-text">${t('Hand-rolled chapatis and homestyle sabjis for gatherings of up to 50.')}</p><div class="actions">${btn('/bulk-orders',t('Plan an Order'))}<a class="under" href="/menu">${t('Explore Menu')}</a></div></div><div class="hero-image"><img fetchpriority="high" src="/images/hero.webp" alt="${t('Fresh Chapatis')} · ${t('Sabjis')} · ${t('Dahi')}"></div></section>
 <section class="wrap feature"><div class="ornament">${bloom}</div><div class="section-title"><h2>${t('From Our Kitchen')}</h2><a class="under" href="/menu">${t('View full menu')}</a></div><div class="cards">${dishes.slice(0,4).map(d=>card(d,t,false)).join('')}</div></section>
 <section class="story-band"><div class="wrap story-inner"><span class="seal">${icon('pin')}</span><div><p class="eyebrow">${t('Our family story')}</p><h2>${t('It started at our chai shop.')}</h2><p>${t(story)}</p></div>${btn('/about',t('Meet the family'),'light')}</div></section>`;
}
function about(t,lang){
 return `<div class="wrap page"><p class="eyebrow">${t('Our family story')}</p><div class="split"><div><h1>${t('It started at our chai shop.')}</h1><p class="lead">${t(story)}</p>${btn('/menu',t('Explore Menu'))}</div><img class="story-photo" src="/images/hero.webp" alt="${t('Fresh Chapatis')}"></div><div class="info-grid"><section class="panel"><h2>${t('Food & hygiene')}</h2><p>${t('Our chapatis contain wheat and our dahi contains milk. Tell us about allergies when you book so the family can discuss ingredients, shared equipment and packing before confirming.')}</p></section><section class="panel"><h2>${t('Customer reviews')}</h2>${shop.reviews.length?shop.reviews.map(r=>`<blockquote>${esc(r[lang]||r.en)}<footer>${esc(r.name)}</footer></blockquote>`).join(''):`<p>${t('Customer reviews will appear here as families share their experiences.')}</p>`}</section></div></div>`;
}
function menu(t){return `<div class="wrap page"><p class="eyebrow">${t('Our kitchen')}</p><h1>${t('Our Food Menu')}</h1><p class="lead">${t('Each chapati includes your choice of lauki, aloo or gobi sabji.')} ${t('Minimum chapati order')} · ${shop.minChapatis}. ${t('Extra sabji')} · ${rupees(shop.extraSabjiPrice)}.</p><div class="filters">${['All dishes','Chapatis','Sabjis','Sides'].map((s,i)=>`<button class="chip" aria-pressed="${!i}" data-filter="${s}">${t(s)}</button>`).join('')}</div><div class="cards menu-cards">${dishes.map(d=>card(d,t,true)).join('')}</div>${note(t)}</div>`}
function estimate(plan,t,fee=null){
 return `<div class="line-items">${dishes.filter(([id])=>plan.items[id]).map(([id,n])=>`<div><span>${t(n)}${sabjiIds.includes(id)?'':' × '+plan.items[id]}</span><b>${sabjiIds.includes(id)?t('Complimentary'):rupees(plan.items[id]*shop.prices[id])}</b></div>`).join('')}${(plan.extraSabjis||[]).map(id=>`<div><span>${t('Extra sabji')} · ${t(dishes.find(d=>d[0]===id)[1])}</span><b>${rupees(shop.extraSabjiPrice)}</b></div>`).join('')}</div>${fee===null?'':`<div class="row"><span>${t('Delivery')}</span><b>${rupees(fee)}</b></div>`}<div class="row total"><span>${t(fee===null?'Food subtotal':'Total')}</span><strong>${rupees(amount(plan)+(fee||0))}</strong></div>`;
}
function counter(key,value,label,max,min=0){return `<div class="counter"><button type="button" data-step="-1" aria-label="− ${label}">−</button><input type="number" inputmode="numeric" aria-label="${label}" name="${key}" min="${min}" max="${max}" required value="${value}"><button type="button" data-step="1" aria-label="+ ${label}">+</button></div>`}
function extraOptions(plan,t){
 return sabjiIds.map(id=>{
  const included=plan.items[id]>0;
  const selected=(plan.extraSabjis||[]).includes(id);
  const name=t(dishes.find(d=>d[0]===id)[1]);
  return `<label class="sabji-option" ${included?'hidden':''}><input name="extraSabji" type="checkbox" value="${id}" ${included?'disabled':''} ${selected?'checked':''}><span>${name} · ${rupees(shop.extraSabjiPrice)}</span></label>`;
 }).join('');
}
function bulk(t,s){
 const p=s.plan||freshPlan();
 const quantityRow=(id,label,unit,min=0)=>`<div class="choice"><div><b>${t(label)}</b><small>${rupees(shop.prices[id])} / ${t(unit)}</small></div>${counter(id,p.items[id],t(label),500,min)}</div>`;
 const options=sabjiIds.map(id=>{
  const name=t(dishes.find(d=>d[0]===id)[1]);
  return `<label class="sabji-option"><input required type="radio" name="sabji" value="${id}" ${p.items[id]>0?'checked':''}><img src="/images/${id}.webp" alt=""><span>${name}</span></label>`;
 }).join('');
 return `<div class="wrap page"><p class="eyebrow">${t('Orders for 1–50 guests')}</p><h1>${t('Plan your gathering')}</h1><p class="lead">${t('Each chapati includes your choice of lauki, aloo or gobi sabji.')}</p><form id="planner" class="columns"><section class="panel"><h2>${t('Build your menu')}</h2><div class="choice guest">${icon('people')}<b>${t('Guests')}</b>${counter('guests',p.guests,t('Guests'),shop.maxGuests,1)}</div><div class="choices"><p class="note">${t('Minimum chapati order')} · ${shop.minChapatis}</p>${quantityRow('chapati','Chapati quantity','per chapati',shop.minChapatis)}<fieldset class="sabji-set"><legend>${t('Choose one complimentary sabji')}</legend>${options}</fieldset><fieldset class="sabji-set"><legend>${t('Additional sabjis (optional)')}</legend>${extraOptions(p,t)}</fieldset><h3 class="group-title">${t('Optional add-ons')}</h3>${quantityRow('dahi','Dahi packet','per packet')}${quantityRow('raita','Raita','per portion')}</div></section><aside class="panel summary"><h2>${t('Your estimate')}</h2><div id="estimate" aria-live="polite">${estimate(p,t)}</div><p class="note">${t('Delivery fee is added at checkout.')}</p>${note(t)}<button class="btn primary wide" type="submit">${t(s.cart?'Update cart':'Add to cart')}</button><p id="error" role="alert"></p></aside></form></div>`;
}
function empty(t,title){return `<div class="wrap page narrow"><div class="panel centered">${icon('bag')}<h1>${t(title)}</h1>${btn('/bulk-orders',t('Plan an Order'))}</div></div>`}
function cart(t,s){
 if(!s.cart)return empty(t,'Your cart is empty.');
 return `<div class="wrap page narrow"><p class="eyebrow">${t('Order details')}</p><h1>${t('Your cart')}</h1><div class="panel"><h2>${t('Your gathering')}</h2><p>${t('Guests')} · ${s.cart.guests}</p>${estimate(s.cart,t)}<p class="note">${t('Delivery fee is added at checkout.')}</p>${note(t)}<div class="actions">${btn('/checkout',t('Continue to checkout'))}${btn('/bulk-orders',t('Edit menu'),'light')}<button id="remove" class="plain">${t('Remove order')}</button></div></div></div>`;
}
function checkout(t,s){
 if(!s.cart)return empty(t,'Your cart is empty.');
 const val=k=>esc(s.fields?.[k]||'');const delivery=s.fields?.method==='Delivery';
 const field=(key,label,type,attrs,wide='')=>`<label class="${wide}">${t(label)}<input name="${key}" type="${type}" value="${val(key)}" ${attrs} required></label>`;
 return `<div class="wrap page"><p class="eyebrow">${t('Your gathering')} · ${s.cart.guests} ${t('Guests')}</p><h1>${t('Checkout')}</h1><form id="checkout" class="columns"><div class="panel field-grid">
 ${field('name','Your name','text','autocomplete="name" maxlength="80"')}${field('phone','Mobile number','tel','autocomplete="tel" inputmode="tel" maxlength="18" placeholder="+91"')}
 <label class="span">${t('Occasion')}<select name="occasion">${occasions.map(o=>`<option value="${o}" ${o===s.fields?.occasion?'selected':''}>${t(o)}</option>`).join('')}</select></label>
 ${field('date','Event date','date',`min="${indianDate()}"`)}${field('time','Required time (IST)','time','')}
 <fieldset class="span"><legend>${t('Receive your order')}</legend><div class="radios">${['Pickup','Delivery'].map(m=>`<label><input type="radio" name="method" value="${m}" ${(m==='Delivery')===delivery?'checked':''}>${t(m)}</label>`).join('')}</div></fieldset>
 <div class="span" id="fulfil"></div><label class="span">${t('Special instructions (optional)')}<textarea name="notes" maxlength="500" rows="3">${val('notes')}</textarea></label><div class="span"><p class="note">${t('WhatsApp will open with your order. Tap Send to message the kitchen.')}</p><button class="btn primary wide" type="submit"> ${t('Order on WhatsApp')} · <span id="place-total">${rupees(amount(s.cart)+(delivery?shop.deliveryCharge:0))}</span></button><p id="error" role="alert"></p></div></div><aside class="summary panel"><h2>${t('Order summary')}</h2><div id="estimate">${estimate(s.cart,t,delivery?shop.deliveryCharge:0)}</div>${note(t)}<p class="note">${t('The kitchen will confirm availability and the final amount with you.')}</p></aside></form></div>`;
}
function fulfil(t,delivery,fields={}){
 if(!delivery)return `<p class="note">${esc(shop.pickupAddress)||t('Pickup address will be confirmed with your booking.')}</p>`;
 return `${shop.deliveryAreas.length?`<label>${t('Service area')}<select required name="area"><option value="">—</option>${shop.deliveryAreas.map(a=>`<option ${a===fields.area?'selected':''}>${esc(a)}</option>`).join('')}</select></label>`:`<p class="note">${t('Delivery area will be checked before the booking is confirmed.')}</p>`}<label>${t('Delivery address')}<textarea required name="address" maxlength="300" rows="2">${esc(fields.address)}</textarea></label>`;
}
function contacts(t){const num=shop.phone.replace(/[^\d+]/g,''),wa=shop.whatsapp.replace(/\D/g,'');return [wa?btn('https://wa.me/'+wa,'WhatsApp','light'):'',num?btn('tel:'+num,esc(shop.phone),'light'):'',shop.email?btn('mailto:'+esc(shop.email),esc(shop.email),'light'):''].join('')}
function contact(t){return `<div class="wrap page"><p class="eyebrow">${t('Tamil Nadu')}</p><h1>${t('Contact our kitchen')}</h1><div class="info-grid"><section class="panel"><h2>${t('Your gathering')}</h2><p>${t('Planning a gathering? Send your details with a booking request so our family can follow up.')}</p><div class="actions">${btn('/bulk-orders',t('Plan an Order'))}${contacts(t)}</div></section><section class="panel"><h2>${t('Service locations')}</h2><p>${shop.deliveryAreas.length?shop.deliveryAreas.map(esc).join(' · '):t('Tamil Nadu')}</p><p>${t('Delivery coverage and pickup details are confirmed for each booking.')}</p>${shop.pickupAddress?`<p>${esc(shop.pickupAddress)}</p>`:''}</section></div></div>`}
function render(path,lang='en',s={}){
 const t=k=>translate(lang,k);
 const nav=[['/','Home'],['/about','About Us'],['/menu','Food Menu'],['/bulk-orders','Bulk Orders'],['/contact','Contact']];
 const links=nav.map(([p,n])=>`<a href="${p}" ${path===p?'aria-current="page"':''}>${t(n)}</a>`).join('');
 const body=({'/':()=>home(t),'/menu':()=>menu(t),'/about':()=>about(t,lang),'/bulk-orders':()=>bulk(t,s),'/cart':()=>cart(t,s),'/checkout':()=>checkout(t,s),'/contact':()=>contact(t)})[path]?.()||`<div class="wrap page centered"><p class="eyebrow">404</p><h1>${t('Page not found')}</h1>${btn('/',t('Back to home'))}</div>`;
 return `<a class="skip" href="#main">${t('Skip to content')}</a><header class="mast"><div class="head-inner">${logo}<nav aria-label="${t('Menu')}" class="desktop-nav">${links}</nav><div class="tools"><label class="lang">${icon('globe')}<select id="language" aria-label="${t('Language')}">${[['en','EN'],['ta','தமிழ்'],['hi','हिन्दी']].map(([v,n])=>`<option value="${v}" ${lang===v?'selected':''}>${n}</option>`).join('')}</select></label><a class="bag" href="/cart" aria-label="${t('Cart')}">${icon('bag')}${s.cart?'<i>1</i>':''}</a><button id="hamburger" aria-label="${t('Menu')}" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button></div></div><nav id="mobile-nav" hidden>${links}</nav></header><main id="main">${body}</main><footer class="footer"><div class="wrap foot-inner"><div>${logo}<p>${t('A Rajasthani kitchen in Tamil Nadu')}</p></div><nav>${links}</nav><small>© ${new Date().getFullYear()} Sharmaji Foods</small></div></footer>${['/','/about','/contact','/menu'].includes(path)?`<div class="sticky-cta">${btn('/bulk-orders',t('Order Now'))}</div>`:''}`;
}


;(()=>{
const path=document.body.dataset.page;
const storage=(store,key,fallback)=>{try{return JSON.parse(store.getItem(key))??fallback}catch{return fallback}};
let lang=storage(localStorage,'sf.language','en');
if(!['en','ta','hi'].includes(lang))lang='en';
const t=k=>translate(lang,k);
let cart=restoreCart(storage(localStorage,'sf.cart',null));
let plan=structuredClone(cart||freshPlan());
const dish=new URLSearchParams(location.search).get('dish');
if(sabjiIds.includes(dish)){chooseSabji(plan.items,dish);plan.extraSabjis=(plan.extraSabjis||[]).filter(id=>id!==dish)}
if(['raita','dahi'].includes(dish)&&!plan.items[dish])plan.items[dish]=1;
let fields=storage(sessionStorage,'sf.fields',{});
const fileCheckout=Boolean(document.body.dataset.page);
const save=(store,k,v)=>store.setItem(k,JSON.stringify(v));
const q=sel=>document.querySelector(sel);
function persistFields(form){
 const values=Object.fromEntries(new FormData(form));
 fields={...fields,...values}; save(sessionStorage,'sf.fields',fields);
}
function draw(){
 document.documentElement.lang=lang;
 document.title=path==='/'?'Sharmaji Foods · '+t('A Rajasthani kitchen in Tamil Nadu'):t(routes[path]||'Page not found')+' · Sharmaji Foods';
 q('#app').innerHTML=localLinks(render(path,lang,{cart,plan,fields}));
 q('#language').onchange=e=>{lang=e.target.value;save(localStorage,'sf.language',lang);draw()};
 q('#hamburger').onclick=e=>{const nav=q('#mobile-nav');nav.hidden=!nav.hidden;e.currentTarget.setAttribute('aria-expanded',String(!nav.hidden))};
 q('#mobile-nav').onkeydown=e=>{if(e.key==='Escape'){q('#hamburger').click();q('#hamburger').focus()}};
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));
  document.querySelectorAll('[data-group]').forEach(el=>el.hidden=b.dataset.filter!=='All dishes'&&el.dataset.group!==b.dataset.filter);
 });
 if(q('#planner'))bindPlanner();
 if(q('#checkout'))bindCheckout();
 if(q('#remove'))q('#remove').onclick=()=>{cart=null;plan=freshPlan();localStorage.removeItem('sf.cart');sessionStorage.removeItem('sf.request');draw()};

}
function bindPlanner(){
 const f=q('#planner');
 function update(e){
  const oldGuests=plan.guests;
  const guests=Number(f.elements.guests.value);
  if(e?.target.name==='guests'&&guests>0&&guests<=shop.maxGuests&&oldGuests>0){
   f.elements.chapati.value=Math.min(500,Math.max(shop.minChapatis,Math.round(plan.items.chapati*guests/oldGuests)));
  }
  plan={guests,items:Object.fromEntries(quantityIds.map(id=>[id,Number(f.elements[id].value)]))};
  const included=f.elements.sabji.value;
  chooseSabji(plan.items,included);
  plan.extraSabjis=[];
  for(const box of f.querySelectorAll('[name=extraSabji]')){
   box.disabled=box.value===included;
   box.closest('label').hidden=box.disabled;
   if(box.disabled)box.checked=false;
   if(box.checked)plan.extraSabjis.push(box.value);
  }
  q('#estimate').innerHTML=estimate(plan,t);q('#error').textContent='';
 }
 f.oninput=update;
 f.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const input=b.parentElement.querySelector('input');input.value=Math.min(Number(input.max),Math.max(Number(input.min),Number(input.value)+Number(b.dataset.step)));update({target:input})});
 f.onsubmit=e=>{e.preventDefault();update();if(!validPlan(plan)){q('#error').textContent=t('Minimum chapati order')+' · '+shop.minChapatis;return}save(localStorage,'sf.cart',plan);location.assign('cart.html')};
}
function bindCheckout(){
 const form=q('#checkout');
 function method(){
  const delivery=form.elements.method.value==='Delivery';
  q('#fulfil').innerHTML=fulfil(t,delivery,fields);
  q('#estimate').innerHTML=estimate(cart,t,delivery?shop.deliveryCharge:0);
  q('#place-total').textContent=rupees(amount(cart)+(delivery?shop.deliveryCharge:0));
 }
 method();
 form.oninput=()=>persistFields(form);
 form.onchange=e=>{persistFields(form);if(e.target.name==='method')method()};
 form.onsubmit=async e=>{
  e.preventDefault();persistFields(form);
  if(!futureEvent(fields.date,fields.time)){q('#error').textContent=t('Choose a later event time.');return}
  if(!/^(?:\+?91)?[6-9]\d{9}$/.test(fields.phone.replace(/[\s()-]/g,''))){form.elements.phone.setCustomValidity(t('Please check the form and try again.'));form.elements.phone.reportValidity();form.elements.phone.oninput=()=>form.elements.phone.setCustomValidity('');return}
  const button=form.querySelector('button[type=submit]');const originalButton=button.innerHTML;button.disabled=true;button.textContent=t('Sending…');q('#error').textContent='';
  const order={plan:cart,...fields,area:fields.method==='Delivery'?(fields.area||''):'',address:fields.method==='Delivery'?(fields.address||''):''};
  const signature=JSON.stringify(order);
  let token=storage(sessionStorage,'sf.request',null);
  if(!token||token.signature!==signature){token={id:crypto.randomUUID(),signature};save(sessionStorage,'sf.request',token)}
  try{
   if(fileCheckout){
    const fee=order.method==='Delivery'?shop.deliveryCharge:0;
    location.assign(whatsappOrderUrl({...order,id:token.id,fee,total:amount(cart)+fee},t));
    return;
   }
   const response=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...order,id:token.id})});
   if(!response.ok)throw new Error(response.status===429?'Too many requests. Please try again later.':response.status===400?'Please check the form and try again.':'We could not save your request. Your cart is still here. Please retry.');
   const saved=await response.json();
   if(saved.whatsappQueued){q('#error').textContent=t('Order notification queued for the kitchen.');return}
   location.assign(whatsappOrderUrl(saved,t));
  }catch(err){
   q('#error').textContent=t(err.message?.includes('Please')?err.message:'We could not save your request. Your cart is still here. Please retry.');
  }finally{
   button.disabled=false;button.innerHTML=originalButton;
  }
 };
}
draw();

})();
