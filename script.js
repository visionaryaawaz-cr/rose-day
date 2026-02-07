// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variables to track state ---
    let currentSlide = 1;
    let rosesClickedCount = 0;
    let blueRoseClicked = false;

    // --- 1. Initial Setup & Background Animations ---
    createFloatingBackgroundHearts();
    
    // Auto-show the button on slide 1 after 3 seconds
    setTimeout(() => {
        document.getElementById('toSlide2Btn').classList.add('show');
    }, 3500);


    // --- 2. Navigation Event Listeners ---
    
    // Slide 1 -> Slide 2 (Memories)
    document.getElementById('toSlide2Btn').addEventListener('click', () => {
        changeSlide(2);
    });

    // Slide 2 -> Slide 3 (5 Roses)
    document.getElementById('toSlide3Btn').addEventListener('click', () => {
        changeSlide(3);
    });

    // Slide 3 -> Slide 4 (Finale Start)
    document.getElementById('toFinalSlideBtn').addEventListener('click', () => {
        changeSlide(4);
    });

    // Slide 4 Finale Click (The Name Heart)
    document.getElementById('nameHeartBtn').addEventListener('click', triggerFinaleAnimation);


    // --- 3. Core Functions ---

    // Function to handle transitions between slides
    function changeSlide(slideNumber) {
        // Hide current active slide
        document.querySelector('.active-slide').classList.remove('active-slide');
        
        // Show new slide with a slight delay for smooth transition
        setTimeout(() => {
            document.getElementById(`slide${slideNumber}`).classList.add('active-slide');
            currentSlide = slideNumber;
        }, 100); // Small buffer
    }

    // --- 4. Slide 3: Rose Mechanics ---
    
    // Data for rose messages
    const roseData = {
        'red': {
            text: "My love for you runs deeper than the reddest rose. You are the fire in my soul, Chetna. ❤️",
            img: "assets/rose-msg-red.jpg"
        },
        'pink': {
            text: "To my beautiful Devi Ji. Your grace and kindness make my life a paradise. I worship the ground you walk on. 🙏🌸",
            img: "assets/rose-msg-pink.jpg"
        },
        'white': {
            text: "Our love is pure, innocent, and eternal. I promise to always protect your heart with pure intentions. 🤍",
            img: "assets/rose-msg-white.jpg"
        },
        'yellow': {
            text: "You bring sunshine, peace, and friendship into my life. Being with you is my happy place. 🌻☀️",
            img: "assets/rose-msg-yellow.jpg"
        },
        'blue': {
            text: "The impossible happened when Bholebaba brought us together. You are my miracle, the rarest enhancement to my existence. 🕉️💙",
            img: "assets/rose-msg-blue.jpg"
        }
    };

    // Global function needed for HTML onclick attribute
    window.openRoseMessage = function(color) {
        const modal = document.getElementById('roseModal');
        const modalImg = document.getElementById('modalImage');
        const modalText = document.getElementById('modalText');
        const data = roseData[color];

        modalImg.src = data.img;
        modalText.innerHTML = data.text;
        modal.classList.remove('hidden');

        // Track clicks for the final button reveal on Slide 3
        rosesClickedCount++;
        if (color === 'blue') {
            blueRoseClicked = true;
        }
        
        // If blue is clicked (and maybe others too), show the final button
        if (blueRoseClicked && rosesClickedCount >= 1) {
             setTimeout(() => {
                const finalBtn = document.getElementById('toFinalSlideBtn');
                finalBtn.classList.remove('hidden');
                // Small delay before fading in
                setTimeout(() => finalBtn.classList.add('show'), 100);
             }, 1000);
        }
    }

    window.closeModal = function() {
        document.getElementById('roseModal').classList.add('hidden');
    }


    // --- 5. Slide 4: The Grand Finale Animation (Using GSAP) ---

    function triggerFinaleAnimation() {
        const nameHeart = document.getElementById('nameHeartBtn');
        const bouquetReveal = document.getElementById('bouquetReveal');
        const finalBouquet = document.getElementById('finalBouquetImage');
        const finalMessage = document.getElementById('finalMessage');

        // Disable further clicks
        nameHeart.style.pointerEvents = 'none';

        const tl = gsap.timeline();

        // Step 1: Explode/Fade out the name heart
        tl.to(nameHeart, {
            duration: 0.8,
            scale: 2,
            opacity: 0,
            ease: "power2.in"
        })
        // Step 2: Make reveal section visible in DOM
        .set(bouquetReveal, { className: "bouquet-reveal" }) // Removes 'hidden' class
        
        // Step 3: Animate the Bouquet appearing realistically
        .to(finalBouquet, {
            duration: 1.5,
            scale: 1,
            opacity: 1,
            rotation: 0,
            ease: "elastic.out(1, 0.5)" // Bouncy realistic effect
        }, "-=0.3") // Start slightly before previous animation ends

        // Step 4: Slide up the final message card
        .to(finalMessage, {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "back.out(1.7)"
        }, "-=0.8");

        // Add massive heart explosion effect on screen (optional advanced step)
        createHeartExplosion();
    }


    // --- Helper: Background Floating Hearts ---
    function createFloatingBackgroundHearts() {
        const container = document.getElementById('heartsContainer');
        const heartEmojis = ['❤️', '💖', '🌹', '🌸'];
        
        // Create 30 floating elements
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Randomize position, size, and animation speed
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            
            container.appendChild(heart);
        }
    }

    // Optional: Little explosion effect for finale
    function createHeartExplosion() {
        for(let i=0; i<50; i++) {
            const heart = document.createElement('div');
            heart.innerText = '💖';
            heart.style.position = 'fixed';
            heart.style.top = '50%';
            heart.style.left = '50%';
            heart.style.fontSize = '30px';
            heart.style.zIndex = '1000';
            document.body.appendChild(heart);

            // Explode outwards using GSAP
            gsap.to(heart, {
                duration: 1.5 + Math.random(),
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
                rotation: Math.random() * 360,
                opacity: 0,
                onComplete: () => heart.remove()
            });
        }
    }

});
