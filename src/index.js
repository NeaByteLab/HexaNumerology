/**
 * Numerology Calculator Class
 */
class NumerologyCalculator {
  /**
   * Private Class Properties
   */
  _letterValueMap = { A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9, J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9, S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8 }

  /**
   * Calculates Digital Root
   * Params: numberValue
   */
  calculateDigitalRoot(numberValue) {
    const masterNumberList = [11, 22, 33]
    let currentNumber = numberValue
    if (masterNumberList.includes(currentNumber)) {
      return currentNumber
    }
    while (currentNumber >= 10) {
      currentNumber = currentNumber.toString().split('').reduce((totalSum, singleDigit) => totalSum + parseInt(singleDigit), 0)
      if (masterNumberList.includes(currentNumber)) {
        return currentNumber
      }
    }
    return currentNumber
  }

  /**
   * Calculates Name Digital Root
   * Params: fullName
   */
  calculateNameDigitalRoot(fullName) {
    return this.calculateDigitalRoot(fullName.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((totalValue, currentLetter) => totalValue + (this._letterValueMap[currentLetter] || 0), 0))
  }

  /**
   * Calculates Birth Date Digital Root
   * Params: dateString
   */
  calculateBirthDigitalRoot(dateString) {
    return this.calculateDigitalRoot(dateString.replace(/[^0-9]/g, '').split('').reduce((totalSum, singleDigit) => totalSum + parseInt(singleDigit), 0))
  }

  /**
   * Calculates Expression Total
   * Params: name
   */
  calculateExpressionTotal(name) {
    return name.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((totalValue, currentLetter) => totalValue + (this._letterValueMap[currentLetter] || 0), 0)
  }

  /**
   * Calculates Soul Urge Digital Root
   * Params: name
   */
  calculateSoulUrgeDigitalRoot(name) {
    return this.calculateDigitalRoot(name.toUpperCase().replace(/[^A-Z]/g, '').split('').filter(currentLetter => 'AEIOU'.includes(currentLetter)).reduce((totalValue, currentLetter) => totalValue + (this._letterValueMap[currentLetter] || 0), 0))
  }

  /**
   * Calculates Personal Year
   * Params: birthDateString, currentYear
   */
  calculatePersonalYear(birthDateString, currentYear) {
    const [ birthDay, birthMonth, birthYear ] = birthDateString.split('-').map(currentValue => parseInt(currentValue))
    return this.calculateDigitalRoot(birthDay + birthMonth + currentYear)
  }

  /**
   * Calculates Personal Month
   * Params: personalYear, currentMonth
   */
  calculatePersonalMonth(personalYear, currentMonth) {
    return this.calculateDigitalRoot(personalYear + currentMonth)
  }

  /**
   * Calculates Personal Day
   * Params: personalMonth, currentDay
   */
  calculatePersonalDay(personalMonth, currentDay) {
    return this.calculateDigitalRoot(personalMonth + currentDay)
  }
}

/**
 * Zodiac Shio Calculator Class
 * Params: localizationData
 */
class ZodiacShioCalculator {
  /**
   * Private Class Properties
   * Params: localizationData
   */
  _zodiacSignList = [
    { sign:'Capricorn', startDay:22, startMonth:12, endDay:19, endMonth:1 },
    { sign:'Aquarius', startDay:20, startMonth:1, endDay:18, endMonth:2 },
    { sign:'Pisces', startDay:19, startMonth:2, endDay:20, endMonth:3 },
    { sign:'Aries', startDay:21, startMonth:3, endDay:19, endMonth:4 },
    { sign:'Taurus', startDay:20, startMonth:4, endDay:20, endMonth:5 },
    { sign:'Gemini', startDay:21, startMonth:5, endDay:20, endMonth:6 },
    { sign:'Cancer', startDay:21, startMonth:6, endDay:22, endMonth:7 },
    { sign:'Leo', startDay:23, startMonth:7, endDay:22, endMonth:8 },
    { sign:'Virgo', startDay:23, startMonth:8, endDay:22, endMonth:9 },
    { sign:'Libra', startDay:23, startMonth:9, endDay:22, endMonth:10 },
    { sign:'Scorpio', startDay:23, startMonth:10, endDay:21, endMonth:11 },
    { sign:'Sagittarius', startDay:22, startMonth:11, endDay:21, endDay:12 }
  ]

  /**
   * Class Constructor
   * Params: localizationData
   */
  constructor(localizationData) {
    this.zodiacDescriptionMap = localizationData.zodiacDescriptions
    this.shioDescriptionMap = localizationData.shioDescriptions
    this.unknownText = localizationData.reportStrings.unknown
  }

  /**
   * Calculates Zodiac Sign
   * Params: birthDateString
   */
  calculateZodiacSign(birthDateString) {
    const [ birthDay, birthMonth ] = birthDateString.split('-').map(currentValue => parseInt(currentValue))
    for (let currentSign of this._zodiacSignList) {
      if ((birthMonth === currentSign.startMonth && birthDay >= currentSign.startDay) || (birthMonth === currentSign.endMonth && birthDay <= currentSign.endDay)) {
        return currentSign.sign
      }
    }
    return 'Capricorn'
  }

  /**
   * Gets Zodiac Description
   * Params: zodiacSign
   */
  getZodiacDescription(zodiacSign) {
    return this.zodiacDescriptionMap[zodiacSign] || this.unknownText
  }

  /**
   * Calculates Shio Sign
   * Params: birthDateString
   */
  calculateShioSign(birthDateString) {
    const birthYear = parseInt(birthDateString.split('-')[2])
    const shioSigns = ['Monyet','Ayam','Anjing','Babi','Tikus','Kerbau','Macan','Kelinci','Naga','Ular','Kuda','Kambing']
    return shioSigns[birthYear % 12]
  }

  /**
   * Gets Shio Description
   * Params: shioSign
   */
  getShioDescription(shioSign) {
    return this.shioDescriptionMap[shioSign] || this.unknownText
  }
}

/**
 * Javanese Weton Calculator Class
 * Params: localizationData
 */
class JavaneseWetonCalculator {
  /**
   * Private Class Properties
   */
  _javaneseMarketList = ['Legi','Pahing','Pon','Wage','Kliwon']
  _javaneseMarketValueMap = { Legi:5, Pahing:9, Pon:7, Wage:4, Kliwon:8 }
  _javaneseDayList = ['Ahad','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
  _javaneseDayValueMap = { Ahad:5, Senin:4, Selasa:3, Rabu:7, Kamis:8, Jumat:6, Sabtu:9 }

  /**
   * Class Constructor
   * Params: localizationData
   */
  constructor(localizationData) {
    this.neptuDescriptionMap = localizationData.neptuDescriptions
    this.suitableForMap = localizationData.reportStrings.suitableFor
  }

  /**
   * Calculates Javanese Weton
   * Params: birthDateString
   */
  calculateJavaneseWeton(birthDateString) {
    const [ birthDay, birthMonth, birthYear ] = birthDateString.split('-').map(currentValue => parseInt(currentValue))
    const birthDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay))
    const totalDaysSinceEpoch = Math.floor(birthDate.getTime() / 86400000)
    const pasaranIndex = (totalDaysSinceEpoch + 3) % 5
    const dayIndex = birthDate.getUTCDay()
    const javaneseMarket = this._javaneseMarketList[pasaranIndex]
    const javaneseDay = this._javaneseDayList[dayIndex]
    return { javaneseDay:javaneseDay, javaneseMarket:javaneseMarket, neptuDay:this._javaneseDayValueMap[javaneseDay], neptuMarket:this._javaneseMarketValueMap[javaneseMarket], neptuTotal:this._javaneseDayValueMap[javaneseDay] + this._javaneseMarketValueMap[javaneseMarket] }
  }

  /**
   * Gets Neptu Description
   * Params: neptuTotal
   */
  getNeptuDescription(neptuTotal) {
    if (!(neptuTotal > 7)) {
      return this.neptuDescriptionMap.lowNeptu
    } else {
      if (!(neptuTotal > 13)) {
        return this.neptuDescriptionMap.mediumNeptu
      } else {
        return this.neptuDescriptionMap.highNeptu
      }
    }
  }

  /**
   * Generates Good Days List
   * Params: myWeton
   */
  generateGoodDaysList(myWeton) {
    const myNeptu = myWeton.neptuTotal
    let resultArray = []
    for (let currentHari of this._javaneseDayList) {
      for (let currentPasaran of this._javaneseMarketList) {
        const neptuCombination = myNeptu + this._javaneseDayValueMap[currentHari] + this._javaneseMarketValueMap[currentPasaran]
        let suitableFor = []
        if (neptuCombination % 7 === 0) {
          suitableFor.push(this.suitableForMap.marriage)
        }
        if (neptuCombination % 5 === 0) {
          suitableFor.push(this.suitableForMap.business)
        }
        if (neptuCombination % 6 === 0) {
          suitableFor.push(this.suitableForMap.movingHouse)
        }
        if (neptuCombination % 4 === 0) {
          suitableFor.push(this.suitableForMap.aqiqah)
        }
        if (neptuCombination % 9 === 0) {
          suitableFor.push(this.suitableForMap.newPosition)
        }
        if (suitableFor.length > 0) {
          resultArray.push({ hariPasaran:`${currentHari} ${currentPasaran}`, neptuKombinasi:neptuCombination, cocokUntuk:suitableFor.join(', ') })
        }
      }
    }
    return resultArray
  }
}

/**
 * Hexa Numerology Generator Class
 * Params: fullName, birthDateString, languageCode
 */
class HexaNumerologyGenerator {
  /**
   * Private Class Properties
   */
  _localizationData = {
    id: {
      reportStrings:{
        title:`Laporan Numerologi + Zodiak + Shio + Weton untuk `,
        zodiacHeader:'Zodiak:',
        shioHeader:'Shio:',
        wetonHeader:'Weton:',
        goodDaysHeader:'Hari-Hari Baik Berdasarkan Weton',
        lifePathHeader:'Life Path',
        nameDRHeader:'Name DR',
        soulUrgeHeader:'Soul Urge',
        maturityHeader:'Maturity',
        personalYearHeader:'Personal Year',
        personalMonthHeader:'Personal Month',
        personalDayHeader:'Personal Day',
        predictionsHeader:'Prediksi 3 Tahun Mendatang',
        unknown:'Tidak Diketahui',
        knownAs: 'Kamu dikenal',
        challengeHeader: 'Tantangan:',
        professionHeader: 'Profesi:',
        yourCharacter: 'Karaktermu',
        avoidHeader: 'Hindari:',
        innermostDrive: 'Dorongan terdalam:',
        bewareHeader: 'Waspadai:',
        inAdulthood: 'Saat dewasa:',
        energyHeader: 'Energi:',
        focusThisMonth: 'Fokus bulan ini:',
        todayEnergy: 'Energi hari ini:',
        suitableFor: {
          marriage: 'Pernikahan',
          business: 'Usaha/Dagang',
          movingHouse: 'Pindah Rumah',
          aqiqah: 'Aqiqah/Syukuran',
          newPosition: 'Jabatan Baru'
        }
      },
      zodiacDescriptions:{
        Aries: 'Sebagai Aries, kamu dikenal sebagai pribadi penuh energi, berani, dan penuh semangat. Kamu suka memimpin, tidak takut menghadapi tantangan, dan selalu ingin menjadi yang terdepan. Sifat tegasmu sering membuat orang kagum, namun perlu hati-hati agar tidak terkesan keras kepala.',
        Taurus: 'Taurus mencerminkan pribadi setia, sabar, dan praktis. Kamu menyukai kenyamanan dan stabilitas, serta gigih dalam mencapai tujuan. Kamu juga dikenal bisa diandalkan, namun kadang keras kepala dalam mempertahankan pendapat.',
        Gemini: 'Gemini adalah zodiak komunikatif, cerdas, dan adaptif. Kamu mudah bergaul, suka berbicara, dan selalu penasaran. Sifat ini membuatmu disukai banyak orang. Namun, waspadai kecenderungan cepat bosan.',
        Cancer: 'Cancer adalah sosok penyayang, sensitif, dan intuitif. Kamu sangat peduli pada orang sekitar, terutama keluarga. Kamu dikenal setia dan perhatian, tapi kadang terlalu emosional.',
        Leo: 'Leo penuh percaya diri, karismatis, dan lahir sebagai pemimpin. Kamu suka tampil menonjol dan menginspirasi orang lain. Kreativitasmu tinggi, tapi hati-hati agar tidak terlalu dominan.',
        Virgo: 'Virgo dikenal teliti, analitis, dan suka membantu. Kamu pekerja keras dan selalu ingin hasil sempurna. Namun, kadang terlalu kritis pada diri sendiri dan orang lain.',
        Libra: 'Libra cinta damai, keindahan, dan keseimbangan. Kamu diplomatis dan selalu berusaha adil. Sifatmu menenangkan, tapi kadang sulit ambil keputusan karena ingin menyenangkan semua pihak.',
        Scorpio: 'Scorpio intens, misterius, dan penuh fokus. Kamu punya tekad kuat dan tidak mudah menyerah. Orang menghormatimu karena kesetiaanmu. Hati-hati agar tidak posesif.',
        Sagittarius: 'Sagittarius optimis, petualang, dan jujur. Kamu mencintai kebebasan dan pengalaman baru. Sifatmu positif, tapi kadang terlalu blak-blak an.',
        Capricorn: 'Capricorn disiplin, ambisius, dan pekerja keras. Kamu fokus pada tujuan dan tangguh menghadapi tantangan. Namun, jangan biarkan ambisimu membuatmu terlalu keras pada diri sendiri.',
        Aquarius: 'Aquarius inovatif, humanis, dan mandiri. Kamu penuh ide baru dan suka membawa perubahan. Sifat bebasmu kadang membuatmu sulit ditebak.',
        Pisces: 'Pisces sensitif, imajinatif, dan penuh empati. Kamu punya jiwa seni dan suka menolong. Perlu hati-hati agar tidak terlalu larut dalam mimpi.'
      },
      shioDescriptions:{
        Tikus: 'Shio Tikus menggambarkan pribadi cerdik, gesit, dan pandai membaca peluang. Kamu cepat beradaptasi, pintar bicara, dan sering sukses dalam usaha. Hati-hati jangan sampai terkesan licik.',
        Kerbau: 'Shio Kerbau dikenal kuat, sabar, dan pekerja keras. Kamu tekun dan bisa diandalkan. Namun, kadang terlalu kaku dalam pendirian.',
        Macan: 'Shio Macan melambangkan keberanian, ambisi, dan jiwa pemimpin. Kamu disegani, tapi perlu mengendalikan sifat dominan agar relasi tetap harmonis.',
        Kelinci: 'Shio Kelinci lembut, sopan, dan suka kedamaian. Kamu perhatian pada orang lain, tapi mudah tersinggung jika dikritik.',
        Naga: 'Shio Naga penuh percaya diri, karismatis, dan punya energi besar. Kamu lahir untuk jadi pemimpin. Hati-hati dengan sifat arogan.',
        Ular: 'Shio Ular bijaksana, misterius, dan penuh pertimbangan. Kamu jarang gegabah, tapi kadang terlalu curiga.',
        Kuda: 'Shio Kuda energik, mandiri, dan suka kebebasan. Kamu penuh ide, tapi kadang egois.',
        Kambing: 'Shio Kambing artistik, santai, dan penyayang. Kamu cinta keindahan, tapi kadang mudah menyerah.',
        Monyet: 'Shio Monyet cerdik, jenaka, dan pandai bicara. Kamu mudah menyesuaikan diri, tapi jangan manipulatif.',
        Ayam: 'Shio Ayam perfeksionis, jujur, dan teliti. Kamu suka keteraturan, tapi kadang terlalu kritis.',
        Anjing: 'Shio Anjing setia, jujur, dan bisa diandalkan. Kamu tulus, tapi jangan terlalu keras pada diri sendiri.',
        Babi: 'Shio Babi dermawan, optimis, dan polos. Kamu disenangi banyak orang, tapi perlu waspada jangan mudah dimanfaatkan.'
      },
      neptuDescriptions:{
        lowNeptu: 'Neptu rendah: sabar, sederhana, perlu usaha keras.',
        mediumNeptu: 'Neptu sedang: seimbang, rezeki dan relasi baik.',
        highNeptu: 'Neptu tinggi: kuat, berpengaruh, jadi tumpuan keluarga.'
      },
      numerologyData:{
        1:{emoji:'🔥',meaning:'Pemimpin, Pionir, Tegas',profession:'CEO, Pemimpin, Pengusaha',challenge:'Keras kepala',strength:'Berani, inisiatif tinggi',weakness:'Dominan, ego tinggi',lifePathDetail:'memimpin dan berinisiatif'},
        2:{emoji:'🤝',meaning:'Diplomatis, Damai, Penengah',profession:'Diplomat, Konselor, HR',challenge:'Terlalu mengalah',strength:'Empati, pendamai',weakness:'Sulit tegas',lifePathDetail:'menciptakan harmoni'},
        3:{emoji:'🎨',meaning:'Kreatif, Ekspresif, Ceria',profession:'Seniman, Desainer, Penulis',challenge:'Mudah bosan',strength:'Kreatif, inspiratif',weakness:'Kurang disiplin',lifePathDetail:'mengekspresikan diri'},
        4:{emoji:'🏗️',meaning:'Praktikal, Tertib, Pekerja Keras',profession:'Insinyur, Manajer, Akuntan',challenge:'Kaku',strength:'Teliti, pekerja keras',weakness:'Sulit spontan',lifePathDetail:'membangun stabilitas'},
        5:{emoji:'🌬️',meaning:'Bebas, Petualang, Dinamis',profession:'Marketing, Travel Consultant',challenge:'Tidak konsisten',strength:'Adaptif, komunikatif',weakness:'Tidak sabar',lifePathDetail:'menjelajah dan berinovasi'},
        6:{emoji:'🌿',meaning:'Penyayang, Harmoni, Bertanggung Jawab',profession:'Guru, Perawat, Pekerja Sosial',challenge:'Terlalu protektif',strength:'Penyayang, bertanggung jawab',weakness:'Terlalu mengalah',lifePathDetail:'melayani dan merawat'},
        7:{emoji:'🔮',meaning:'Analitis, Bijak, Misterius',profession:'Peneliti, Filsuf, Analis',challenge:'Menutup diri',strength:'Analitis, mendalam',weakness:'Suka menyendiri',lifePathDetail:'mencari makna'},
        8:{emoji:'💎',meaning:'Kuat, Sukses Material, Disiplin',profession:'Pebisnis, Investor, Manajer',challenge:'Perfeksionis',strength:'Disiplin, visioner',weakness:'Kaku pada aturan',lifePathDetail:'mencapai sukses material'},
        9:{emoji:'🌟',meaning:'Humanis, Dermawan, Spiritualitas Tinggi',profession:'Aktivis, Relawan, Pembicara',challenge:'Terlalu idealis',strength:'Dermawan, penuh kasih',weakness:'Lupa diri',lifePathDetail:'mengabdi pada sesama'},
        11:{emoji:'🚀',meaning:'Master Builder, Intuisi Tinggi',profession:'Spiritual Guide, Inventor',challenge:'Terlalu sensitif',strength:'Intuitif, inspiratif',weakness:'Cemas, mudah stres',lifePathDetail:'mengembangkan intuisi'},
        22:{emoji:'🌉',meaning:'Master Architect, Visioner, Mampu Mewujudkan Impian',profession:'Arsitek, Pemimpin Organisasi Besar',challenge:'Kurang praktis',strength:'Visioner, mampu mewujudkan',weakness:'Terlalu perfeksionis',lifePathDetail:'mewujudkan proyek besar'},
        33:{emoji:'❤️‍🔥',meaning:'Master Teacher, Penuh Kasih, Jiwa Pengabdi',profession:'Philanthropist, Guru Spiritual',challenge:'Mengabaikan diri sendiri',strength:'Empati, pengabdian total',weakness:'Kurang realistis',lifePathDetail:'melayani kemanusiaan'}
      }
    },
    en: {
      reportStrings:{
        title:`Numerology + Zodiac + Shio + Weton Report for `,
        zodiacHeader:'Zodiac:',
        shioHeader:'Shio:',
        wetonHeader:'Weton:',
        goodDaysHeader:'Good Days Based on Weton',
        lifePathHeader:'Life Path',
        nameDRHeader:'Name DR',
        soulUrgeHeader:'Soul Urge',
        maturityHeader:'Maturity',
        personalYearHeader:'Personal Year',
        personalMonthHeader:'Personal Month',
        personalDayHeader:'Personal Day',
        predictionsHeader:'3-Year Forecast',
        unknown:'Unknown',
        knownAs: 'You are known as',
        challengeHeader: 'Challenge:',
        professionHeader: 'Profession:',
        yourCharacter: 'Your character is',
        avoidHeader: 'Avoid:',
        innermostDrive: 'Innermost drive:',
        bewareHeader: 'Beware:',
        inAdulthood: 'In adulthood:',
        energyHeader: 'Energy:',
        focusThisMonth: 'Focus this month:',
        todayEnergy: 'Energy today:',
        suitableFor: {
          marriage: 'Marriage',
          business: 'Business/Trade',
          movingHouse: 'Moving House',
          aqiqah: 'Aqiqah/Thanksgiving',
          newPosition: 'New Position'
        }
      },
      zodiacDescriptions:{
        Aries: 'As an Aries, you are known as an energetic, brave, and passionate individual. You like to lead, are not afraid to face challenges, and always want to be at the forefront. Your assertive nature often makes people admire you, but be careful not to appear too stubborn.',
        Taurus: 'Taurus reflects a loyal, patient, and practical personality. You value comfort and stability and are persistent in achieving your goals. You are also known to be reliable, but can sometimes be stubborn in maintaining your opinions.',
        Gemini: 'Gemini is a communicative, intelligent, and adaptable sign. You are sociable, enjoy talking, and are always curious. This trait makes you popular. However, be wary of a tendency to get bored quickly.',
        Cancer: 'A Cancer is a loving, sensitive, and intuitive person. You care deeply for those around you, especially family. You are known to be loyal and caring, but can sometimes be overly emotional.',
        Leo: 'Leo is confident, charismatic, and a born leader. You like to stand out and inspire others. Your creativity is high, but be careful not to be too dominant.',
        Virgo: 'Virgo is known for being meticulous, analytical, and helpful. You are a hard worker and always want perfect results. However, you can sometimes be too critical of yourself and others.',
        Libra: 'Libra loves peace, beauty, and balance. You are diplomatic and always strive for fairness. Your calming nature is a plus, but you can sometimes find it difficult to make decisions because you want to please everyone.',
        Scorpio: 'Scorpio is intense, mysterious, and highly focused. You have a strong determination and do not give up easily. People respect you for your loyalty. Be careful not to be too possessive.',
        Sagittarius: 'Sagittarius is optimistic, adventurous, and honest. You love freedom and new experiences. Your positive nature is a strength, but you can sometimes be too blunt.',
        Capricorn: 'Capricorn is disciplined, ambitious, and hardworking. You are focused on your goals and resilient in the face of challenges. However, do not let your ambition make you too hard on yourself.',
        Aquarius: 'Aquarius is innovative, humane, and independent. You are full of new ideas and like to bring about change. Your free-spirited nature can sometimes make you hard to predict.',
        Pisces: 'Pisces sensitive, imaginative, and full of empathy. You have an artistic soul and enjoy helping others. You need to be careful not to get too lost in dreams.'
      },
      shioDescriptions:{
        Tikus: 'The Rat symbolizes a clever, agile, and opportunistic individual. You are quick to adapt, good at talking, and often successful in business. Be careful not to appear cunning.',
        Kerbau: 'The Ox is known for being strong, patient, and hardworking. You are persistent and reliable. However, you can sometimes be too rigid in your beliefs.',
        Macan: 'The Tiger symbolizes courage, ambition, and a leadership spirit. You are respected, but you need to control your dominant nature for harmonious relationships.',
        Kelinci: 'The Rabbit is gentle, polite, and loves peace. You are considerate of others but can be easily offended by criticism.',
        Naga: 'The Dragon is confident, charismatic, and full of great energy. You are born to be a leader. Be careful of arrogance.',
        Ular: 'The Snake is wise, mysterious, and thoughtful. You are rarely reckless, but can sometimes be too suspicious.',
        Kuda: 'The Horse is energetic, independent, and loves freedom. You are full of ideas, but can sometimes be selfish.',
        Kambing: 'The Goat is artistic, relaxed, and affectionate. You love beauty, but can sometimes give up easily.',
        Monyet: 'The Monkey is clever, witty, and good at conversation. You adapt easily, but avoid being manipulative.',
        Ayam: 'The Rooster is a perfectionist, honest, and meticulous. You like order, but can be overly critical.',
        Anjing: 'The Dog is loyal, honest, and reliable. You are sincere, but do not be too hard on yourself.',
        Babi: 'The Pig is generous, optimistic, and innocent. You are well-liked, but need to be careful not to be easily taken advantage of.'
      },
      neptuDescriptions:{
        lowNeptu: 'Low neptu: patient, simple, needs hard work.',
        mediumNeptu: 'Medium neptu: balanced, good fortune and relationships.',
        highNeptu: 'High neptu: strong, influential, a pillar of the family.'
      },
      numerologyData:{
        1:{emoji:'🔥',meaning:'Leader, Pioneer, Assertive',profession:'CEO, Leader, Entrepreneur',challenge:'Stubbornness',strength:'Brave, high initiative',weakness:'Dominant, high ego',lifePathDetail:'to lead and take initiative'},
        2:{emoji:'🤝',meaning:'Diplomatic, Peaceful, Mediator',profession:'Diplomat, Counselor, HR',challenge:'Too yielding',strength:'Empathetic, peacemaker',weakness:'Difficulty being assertive',lifePathDetail:'to create harmony'},
        3:{emoji:'🎨',meaning:'Creative, Expressive, Cheerful',profession:'Artist, Designer, Writer',challenge:'Easily bored',strength:'Creative, inspiring',weakness:'Lack of discipline',lifePathDetail:'to express oneself'},
        4:{emoji:'🏗️',meaning:'Practical, Orderly, Hardworking',profession:'Engineer, Manager, Accountant',challenge:'Rigid',strength:'Meticulous, hardworking',weakness:'Difficulty with spontaneity',lifePathDetail:'to build stability'},
        5:{emoji:'🌬️',meaning:'Free, Adventurous, Dynamic',profession:'Marketing, Travel Consultant',challenge:'Inconsistent',strength:'Adaptable, communicative',weakness:'Impatient',lifePathDetail:'to explore and innovate'},
        6:{emoji:'🌿',meaning:'Loving, Responsible, Harmonious',profession:'Teacher, Nurse, Social Worker',challenge:'Overly protective',strength:'Caring, responsible',weakness:'Too yielding',lifePathDetail:'to serve and nurture'},
        7:{emoji:'🔮',meaning:'Analytical, Wise, Mysterious',profession:'Researcher, Philosopher, Analyst',challenge:'Closed off',strength:'Analytical, profound',weakness:'Likes to be alone',lifePathDetail:'to seek meaning'},
        8:{emoji:'💎',meaning:'Strong, Material Success, Disciplined',profession:'Businessman, Investor, Manager',challenge:'Perfectionist',strength:'Disciplined, visionary',weakness:'Rigid adherence to rules',lifePathDetail:'to achieve material success'},
        9:{emoji:'🌟',meaning:'Humanitarian, Generous, High Spirituality',profession:'Activist, Volunteer, Speaker',challenge:'Too idealistic',strength:'Generous, compassionate',weakness:'Forgetting oneself',lifePathDetail:'to serve humanity'},
        11:{emoji:'🚀',meaning:'Master Builder, High Intuition',profession:'Spiritual Guide, Inventor',challenge:'Overly sensitive',strength:'Intuitive, inspiring',weakness:'Anxious, easily stressed',lifePathDetail:'to develop intuition'},
        22:{emoji:'🌉',meaning:'Master Architect, Visionary, Can Realize Dreams',profession:'Architect, Leader of Large Organizations',challenge:'Lacks practicality',strength:'Visionary, able to manifest',weakness:'Too perfectionistic',lifePathDetail:'to realize grand projects'},
        33:{emoji:'❤️‍🔥',meaning:'Master Teacher, Compassionate, Soul of Service',profession:'Philanthropist, Spiritual Teacher',challenge:'Neglecting oneself',strength:'Empathetic, total dedication',weakness:'Less realistic',lifePathDetail:'to serve humanity'}
      }
    }
  }

  /**
   * Class Constructor
   * Params: fullName, birthDateString, languageCode
   */
  constructor(fullName, birthDateString, languageCode = 'id') {
    this.fullName = fullName
    this.birthDateString = birthDateString
    this.localizationData = this._localizationData[languageCode] || this._localizationData['id']
    this.numerologyCalculator = new NumerologyCalculator()
    this.zodiacShioCalculator = new ZodiacShioCalculator(this.localizationData)
    this.javaneseWetonCalculator = new JavaneseWetonCalculator(this.localizationData)
    this.drName = this.numerologyCalculator.calculateNameDigitalRoot(this.fullName)
    this.drBirth = this.numerologyCalculator.calculateBirthDigitalRoot(this.birthDateString)
    this.expressionTotal = this.numerologyCalculator.calculateExpressionTotal(this.fullName)
    this.soulUrge = this.numerologyCalculator.calculateSoulUrgeDigitalRoot(this.fullName)
    this.maturity = this.numerologyCalculator.calculateDigitalRoot(this.drBirth + this.numerologyCalculator.calculateDigitalRoot(this.expressionTotal))
    this.personalYear = this.numerologyCalculator.calculatePersonalYear(this.birthDateString, new Date().getFullYear())
    this.personalMonth = this.numerologyCalculator.calculatePersonalMonth(this.personalYear, new Date().getMonth() + 1)
    this.personalDay = this.numerologyCalculator.calculatePersonalDay(this.personalMonth, new Date().getDate())
    this.zodiac = this.zodiacShioCalculator.calculateZodiacSign(this.birthDateString)
    this.shio = this.zodiacShioCalculator.calculateShioSign(this.birthDateString)
    this.weton = this.javaneseWetonCalculator.calculateJavaneseWeton(this.birthDateString)
  }

  /**
   * Generates Detailed Report
   */
  generateDetailedReport() {
    const userProfile = this.buildUserProfile()
    const futureTrends = this.predictNextThreeYears()
    const goodDaysList = this.javaneseWetonCalculator.generateGoodDaysList(this.weton)
    const reportStrings = this.localizationData.reportStrings
    return `
✨ **${reportStrings.title}${this.fullName} (${this.birthDateString})**

🌠 **${reportStrings.zodiacHeader} ${this.zodiac}**
${this.zodiacShioCalculator.getZodiacDescription(this.zodiac)}

🐲 **${reportStrings.shioHeader} ${this.shio}**
${this.zodiacShioCalculator.getShioDescription(this.shio)}

🌾 **${reportStrings.wetonHeader} ${this.weton.javaneseDay} ${this.weton.javaneseMarket} (Neptu ${this.weton.neptuTotal})**
${this.javaneseWetonCalculator.getNeptuDescription(this.weton.neptuTotal)}

🌞 **${reportStrings.goodDaysHeader}**
${goodDaysList.map(javaneseDay => `• ${javaneseDay.hariPasaran} (Neptu ${javaneseDay.neptuKombinasi}): ${javaneseDay.cocokUntuk}`).join('\n')}

🌟 **${reportStrings.lifePathHeader} (${userProfile.birthDR.emoji} ${userProfile.birthDR.meaning})**
${userProfile.birthDR.meaning}. ${reportStrings.knownAs} ${userProfile.birthDR.strength.toLowerCase()}. ${reportStrings.challengeHeader} ${userProfile.birthDR.challenge.toLowerCase()}. ${reportStrings.professionHeader} ${userProfile.birthDR.profession}. ${userProfile.birthDR.recommendation}

🎨 **${reportStrings.nameDRHeader} (${userProfile.nameDR.emoji} ${userProfile.nameDR.meaning})**
${userProfile.nameDR.meaning}. ${reportStrings.yourCharacter} ${userProfile.nameDR.strength.toLowerCase()}. ${reportStrings.avoidHeader} ${userProfile.nameDR.challenge.toLowerCase()}.

❤️ **${reportStrings.soulUrgeHeader} (${userProfile.soulUrge.emoji} ${userProfile.soulUrge.meaning})**
${reportStrings.innermostDrive} ${userProfile.soulUrge.strength.toLowerCase()}. ${reportStrings.bewareHeader} ${userProfile.soulUrge.weakness.toLowerCase()}.

💎 **${reportStrings.maturityHeader} (${userProfile.maturity.emoji} ${userProfile.maturity.meaning})**
${reportStrings.inAdulthood} ${userProfile.maturity.strength.toLowerCase()}.

⏳ **${reportStrings.personalYearHeader} (${userProfile.personalYear.emoji} ${userProfile.personalYear.meaning})**
${reportStrings.energyHeader} ${this.getNumerologyDetail(this.personalYear, 'lifePathDetail')}.

🗓️ **${reportStrings.personalMonthHeader} (${this.getNumerologyDetail(this.personalMonth, 'emoji')} ${this.getNumerologyDetail(this.personalMonth, 'meaning')})**
${reportStrings.focusThisMonth} ${this.getNumerologyDetail(this.personalMonth, 'lifePathDetail')}.

🗓️ **${reportStrings.personalDayHeader} (${this.getNumerologyDetail(this.personalDay, 'emoji')} ${this.getNumerologyDetail(this.personalDay, 'meaning')})**
${reportStrings.todayEnergy} ${this.getNumerologyDetail(this.personalDay, 'lifePathDetail')}.

🔮 **${reportStrings.predictionsHeader}**
${Object.entries(futureTrends).map(([futureYear, yearTrend]) => `• ${futureYear}: ${yearTrend.personalYear} (${yearTrend.emoji} ${yearTrend.meaning}), fokus: ${yearTrend.focus.toLowerCase()}`).join('\n')}
`
  }

  /**
   * Builds User Profile
   */
  buildUserProfile() {
    const detailForName = this.buildDetail(this.drName)
    const detailForBirth = this.buildDetail(this.drBirth)
    const detailForSoulUrge = this.buildDetail(this.soulUrge)
    const detailForMaturity = this.buildDetail(this.maturity)
    const detailForPersonalYear = this.buildDetail(this.personalYear)
    return { nameDR:detailForName, birthDR:detailForBirth, soulUrge:detailForSoulUrge, maturity:detailForMaturity, personalYear:detailForPersonalYear }
  }

  /**
   * Builds Detail
   * Params: digitalRoot
   */
  buildDetail(digitalRoot) {
    const detailData = this.localizationData.numerologyData[digitalRoot]
    const unknownText = this.localizationData.reportStrings.unknown
    if (!(detailData)) {
      return {
        emoji:'❓',
        meaning:unknownText,
        profession:unknownText,
        challenge:unknownText,
        strength:unknownText,
        weakness:unknownText,
        recommendation:unknownText
      }
    }
    const recPrefix = this.localizationData.reportStrings.recommendationPrefix
    const recSuffix = this.localizationData.reportStrings.recommendationSuffix
    return {
      emoji:detailData.emoji,
      meaning:detailData.meaning,
      profession:detailData.profession,
      challenge:detailData.challenge,
      strength:detailData.strength,
      weakness:detailData.weakness,
      recommendation:`${recPrefix} ${detailData.strength.toLowerCase()}, ${recSuffix} ${detailData.weakness.toLowerCase()}.`
    }
  }

  /**
   * Predicts Next Three Years
   */
  predictNextThreeYears() {
    const currentYear = new Date().getFullYear()
    const trendsObject = {}
    for (let loopIndex = 0; loopIndex < 3; loopIndex++) {
      const futureYear = currentYear + loopIndex
      const personalYearNumber = this.numerologyCalculator.calculatePersonalYear(this.birthDateString, futureYear)
      const yearTrendData = this.buildDetail(personalYearNumber)
      trendsObject[futureYear] = { personalYear:personalYearNumber, meaning:yearTrendData.meaning, focus:yearTrendData.recommendation, emoji:yearTrendData.emoji }
    }
    return trendsObject
  }

  /**
   * Gets Numerology Detail
   * Params: digitalRoot, detailKey
   */
  getNumerologyDetail(digitalRoot, detailKey) {
    const detailData = this.localizationData.numerologyData[digitalRoot]
    const unknownText = this.localizationData.reportStrings.unknown
    return detailData ? detailData[detailKey] : unknownText
  }
}

/**
 * Export Modules
 */
module.exports = HexaNumerologyGenerator