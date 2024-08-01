document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('diseaseForm');
    const diseaseName = document.getElementById('diseaseName');
    const diseaseDescription = document.getElementById('diseaseDescription');
    const diseaseImage = document.getElementById('diseaseImage');
    const treatmentText = document.getElementById('treatment');
    const adviceText = document.getElementById('advice');
    const sourceLink = document.getElementById('sourceLink');
    const homeLink = document.getElementById('homeLink');

    const plants = ['Apple', 'Banana', 'Grapes', 'Custard Apple'];
    const symptoms = ['Yellow leaves', 'Spots', 'Wilting', 'Pale yellow-green lesions', 'White fruiting structures', 'Reddish brown spots on leaves', 'Black scab on berries', 'Yellowish spots', 'Brownish patches', 'Irregularly shaped spots', 'Feathered edge', 'Purplish to black spots', 'White mycelia'];

    const plantSelect = document.getElementById('plant');
    const symptomSelect = document.getElementById('symptoms');

    plants.forEach(plant => {
        const option = document.createElement('option');
        option.value = plant;
        option.textContent = plant;
        plantSelect.appendChild(option);
    });

    symptoms.forEach(symptom => {
        const option = document.createElement('option');
        option.value = symptom;
        option.textContent = symptom;
        symptomSelect.appendChild(option);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedPlant = plantSelect.value;
        const selectedSymptoms = Array.from(symptomSelect.selectedOptions).map(option => option.value);

        fetch('data/diseases.json')
            .then(response => response.json())
            .then(data => {
                const disease = identifyDisease(data, selectedPlant, selectedSymptoms);
                displayResult(disease);
            });
    });

    homeLink.addEventListener('click', function () {
        window.location.reload();
    });

    function identifyDisease(data, plant, symptoms) {
        return data.find(disease => disease.plant === plant && symptoms.every(symptom => disease.symptoms.includes(symptom)));
    }

    function displayResult(disease) {
        if (disease) {
            diseaseName.textContent = `Disease: ${disease.name}`;
            diseaseDescription.textContent = disease.description;
            diseaseImage.src = disease.image;
            diseaseImage.style.display = 'block';
            treatmentText.textContent = disease.treatment;
            adviceText.textContent = disease.advice;
            sourceLink.href = disease.source;
            sourceLink.style.display = 'block';
        } else {
            diseaseName.textContent = '';
            diseaseDescription.textContent = 'No matching disease found.';
            diseaseImage.style.display = 'none';
            treatmentText.textContent = '';
            adviceText.textContent = '';
            sourceLink.style.display = 'none';
        }
    }
});
