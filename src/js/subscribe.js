const API_URL = 'https://energyflow.b.goit.study/api/subscription';

const form = document.querySelector('#subscribe-form');


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.elements.email.value;

    console.log(email);
    try {
        const result = await subscribe(email);

        form.reset();
    } catch {
        console.log('error')
    }

    console.log(result);

});

async function subscribe(email) {
    const result = await fetch(API_URL, {
        body: JSON.stringify({ email }),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    });

    return result.json();
}