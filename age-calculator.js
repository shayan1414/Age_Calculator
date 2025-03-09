document.addEventListener('DOMContentLoaded', function() {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateAge);

    function calculateAge() {
        const birthDate = new Date(birthdateInput.value);
        const today = new Date();

        if (!birthdateInput.value) {
            alert('Please enter your birth date');
            return;
        }

        if (birthDate > today) {
            alert('Birth date cannot be in the future');
            return;
        }

        // Calculate years, months, and days
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative months or days
        if (days < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate total values
        const timeDiff = today.getTime() - birthDate.getTime();
        const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const totalMonths = years * 12 + months;
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;

        // Update basic age information
        document.querySelector('.years .value').textContent = years;
        document.querySelector('.months .value').textContent = months;
        document.querySelector('.days .value').textContent = days;

        // Update detailed results
        document.getElementById('total-months').textContent = `${totalMonths} months ${days} days`;
        document.getElementById('total-weeks').textContent = `${totalWeeks} weeks ${remainingDays} days`;
        document.getElementById('total-days').textContent = totalDays.toLocaleString();
        document.getElementById('total-hours').textContent = totalHours.toLocaleString();
        document.getElementById('total-minutes').textContent = totalMinutes.toLocaleString();
        document.getElementById('total-seconds').textContent = totalSeconds.toLocaleString();

        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        
        // Update additional information
        document.getElementById('next-birthday').textContent = nextBirthday.toLocaleDateString();
        document.getElementById('days-to-birthday').textContent = `${daysUntilBirthday} days from now`;
        document.getElementById('birth-day').textContent = daysOfWeek[birthDate.getDay()];
        document.getElementById('zodiac-sign').textContent = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());
        document.getElementById('chinese-zodiac').textContent = getChineseZodiac(birthDate.getFullYear());

        // Generate fun facts
        generateFunFacts(totalDays);

        // Show results
        resultSection.style.display = 'block';
        resultSection.classList.add('show');
    }

    function getZodiacSign(month, day) {
        const zodiacDates = [
            { sign: 'Capricorn', start: [1, 1], end: [1, 19] },
            { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
            { sign: 'Pisces', start: [2, 19], end: [3, 20] },
            { sign: 'Aries', start: [3, 21], end: [4, 19] },
            { sign: 'Taurus', start: [4, 20], end: [5, 20] },
            { sign: 'Gemini', start: [5, 21], end: [6, 20] },
            { sign: 'Cancer', start: [6, 21], end: [7, 22] },
            { sign: 'Leo', start: [7, 23], end: [8, 22] },
            { sign: 'Virgo', start: [8, 23], end: [9, 22] },
            { sign: 'Libra', start: [9, 23], end: [10, 22] },
            { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
            { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
            { sign: 'Capricorn', start: [12, 22], end: [12, 31] }
        ];

        for (let zodiac of zodiacDates) {
            const [startMonth, startDay] = zodiac.start;
            const [endMonth, endDay] = zodiac.end;
            
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return zodiac.sign;
            }
        }
        
        return 'Unknown';
    }

    function getChineseZodiac(year) {
        const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
        return animals[(year - 4) % 12];
    }

    function generateFunFacts(totalDays) {
        const funFactsList = document.getElementById('fun-facts-list');
        funFactsList.innerHTML = '';

        const facts = [
            `You've slept approximately ${Math.round(totalDays * 8).toLocaleString()} hours (assuming 8 hours per day)`,
            `Your heart has beaten approximately ${Math.round(totalDays * 24 * 60 * 80).toLocaleString()} times (assuming 80 beats per minute)`,
            `You've eaten approximately ${Math.round(totalDays * 3).toLocaleString()} meals (assuming 3 meals per day)`,
            `You've taken approximately ${Math.round(totalDays * 24 * 60 * 12).toLocaleString()} breaths (assuming 12 breaths per minute)`,
            `You've experienced approximately ${Math.round(totalDays / 29.53).toLocaleString()} full moons`
        ];

        facts.forEach(fact => {
            const li = document.createElement('li');
            li.textContent = fact;
            funFactsList.appendChild(li);
        });
    }

    // Set max date to today
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    birthdateInput.setAttribute('max', maxDate);

    // Days of week array
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
});
