// birthDateConverter.js

// জন্ম তারিখকে ইংরেজিতে কথায় রূপান্তর করার ফাংশন
function convertDateToWords(dateString) {
    // তারিখ ভাগে বিভক্ত করুন
    const parts = dateString.split('/');
    if (parts.length !== 3) return "Invalid date format";
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // তারিখের বৈধতা পরীক্ষা করুন
    if (isNaN(day) || isNaN(month) || isNaN(year)) return "Invalid date";
    if (day < 1 || day > 31) return "Invalid day";
    if (month < 1 || month > 12) return "Invalid month";
    if (year < 1000 || year > 9999) return "Invalid year";
    
    // দিনকে কথায় রূপান্তর করুন
    const dayInWords = convertDayToWords(day);
    
    // মাসকে কথায় রূপান্তর করুন
    const monthInWords = convertMonthToWords(month);
    
    // বছরকে কথায় রূপান্তর করুন
    const yearInWords = convertYearToWords(year);
    
    // সবগুলো অংশ একত্রিত করুন
    return `${dayInWords} of ${monthInWords} ${yearInWords}`;
}

// দিনকে কথায় রূপান্তর করার ফাংশন
function convertDayToWords(day) {
    const days = {
        1: 'First', 2: 'Second', 3: 'Third Three', 4: 'Fourth', 5: 'Fifth',
        6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth',
        11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth',
        15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth', 18: 'Eighteenth',
        19: 'Nineteenth', 20: 'Twentieth', 21: 'Twenty First', 22: 'Twenty Second',
        23: 'Twenty Three', 24: 'Twenty Fourth', 25: 'Twenty Fifth', 26: 'Twenty Sixth',
        27: 'Twenty Seventh', 28: 'Twenty Eighth', 29: 'Twenty Ninth', 30: 'Thirtieth',
        31: 'Thirty First'
    };
    
    return days[day] || day.toString();
}

// মাসকে কথায় রূপান্তর করার ফাংশন
function convertMonthToWords(month) {
    const months = {
        1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
        7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
    };
    
    return months[month];
}

// বছরকে কথায় রূপান্তর করার ফাংশন
function convertYearToWords(year) {
    if (year < 1000 || year > 9999) return "Invalid year";
    
    // বছরকে দুটি অংশে বিভক্ত করুন
    const firstTwoDigits = Math.floor(year / 100);
    const lastTwoDigits = year % 100;
    
    let firstPart = '';
    let secondPart = '';
    
    // প্রথম দুটি অঙ্কের জন্য
    if (firstTwoDigits >= 10 && firstTwoDigits <= 19) {
        const teens = {
            10: 'Ten', 11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen',
            15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen'
        };
        firstPart = teens[firstTwoDigits];
    } else {
        const tens = {
            2: 'Twenty', 3: 'Thirty', 4: 'Forty', 5: 'Fifty',
            6: 'Sixty', 7: 'Seventy', 8: 'Eighty', 9: 'Ninety'
        };
        const units = {
            0: '', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
            6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine'
        };
        
        const tensDigit = Math.floor(firstTwoDigits / 10);
        const unitsDigit = firstTwoDigits % 10;
        
        firstPart = tens[tensDigit];
        if (unitsDigit > 0) {
            firstPart += ' ' + units[unitsDigit];
        }
    }
    
    // শেষ দুটি অঙ্কের জন্য
    if (lastTwoDigits === 0) {
        secondPart = '';
    } else if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
        const teens = {
            10: 'Tenth', 11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth',
            15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth', 18: 'Eighteenth', 19: 'Nineteenth'
        };
        secondPart = teens[lastTwoDigits];
    } else {
        const tens = {
            2: 'Twenty', 3: 'Thirty', 4: 'Forty', 5: 'Fifty',
            6: 'Sixty', 7: 'Seventy', 8: 'Eighty', 9: 'Ninety'
        };
        const units = {
            0: '', 1: 'First', 2: 'Second', 3: 'Three', 4: 'Fourth', 5: 'Fifth',
            6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth'
        };
        
        const tensDigit = Math.floor(lastTwoDigits / 10);
        const unitsDigit = lastTwoDigits % 10;
        
        if (tensDigit > 1) {
            secondPart = tens[tensDigit];
            if (unitsDigit > 0) {
                secondPart += ' ' + units[unitsDigit];
            } else {
                secondPart += 'th';
            }
        } else if (tensDigit === 1) {
            secondPart = units[lastTwoDigits];
        } else {
            secondPart = units[unitsDigit];
        }
    }
    
    // বিশেষ ক্ষেত্র: 2000, 2001, ইত্যাদি
    if (firstTwoDigits === 20) {
        firstPart = 'Two Thousand';
        if (lastTwoDigits === 0) {
            return firstPart;
        } else {
            return `${firstPart} ${secondPart}`;
        }
    }
    
    // বিশেষ ক্ষেত্র: 1900, 1901, ইত্যাদি
    if (firstTwoDigits === 19) {
        firstPart = 'Nineteen';
        if (lastTwoDigits === 0) {
            return `${firstPart} Hundred`;
        } else {
            return `${firstPart} ${secondPart}`;
        }
    }
    
    // সাধারণ ক্ষেত্র
    if (secondPart) {
        return `${firstPart} ${secondPart}`;
    } else {
        return `${firstPart} Hundred`;
    }
}

// বাংলা সংখ্যা থেকে ইংরেজি সংখ্যায় রূপান্তর ফাংশন
function convertBengaliToEnglishDigits(input) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return input.replace(/[০-৯]/g, (match) => {
        return bengaliDigits.indexOf(match);
    });
}

// তারিখ ফরম্যাট যাচাই করার ফাংশন
function isValidDateFormat(input) {
    const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = input.match(pattern);
    if (!match) return false;
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    return true;
}

// কনভার্ট বাটন ইভেন্ট হ্যান্ডলার
document.addEventListener('DOMContentLoaded', function() {
    const convertButtons = document.querySelectorAll('.Convert_Button');
    
    convertButtons.forEach(button => {
        button.addEventListener('click', function() {
            // জন্ম তারিখ ইনপুট ফিল্ড থেকে মান নিন
            const dobInput = document.getElementById('dob');
            let dobValue = dobInput.value.trim();
            
            // বাংলা সংখ্যা থাকলে ইংরেজিতে রূপান্তর করুন
            dobValue = convertBengaliToEnglishDigits(dobValue);
            
            // তারিখ ফরম্যাট যাচাই করুন
            if (!isValidDateFormat(dobValue)) {
                alert('দয়া করে সঠিক তারিখ ফরম্যাট ব্যবহার করুন (DD/MM/YYYY)');
                dobInput.classList.add('error');
                return;
            }
            
            // তারিখকে কথায় রূপান্তর করুন
            const dateInWords = convertDateToWords(dobValue);
            
            // রূপান্তরিত মানটি শব্দ ফিল্ডে বসান
            const dobWordsInput = document.getElementById('dob_words');
            dobWordsInput.value = dateInWords;
            
            // ত্রুটি স্টাইল সরান
            dobInput.classList.remove('error');
        });
    });
});