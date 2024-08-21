import { LightningElement, track } from 'lwc';

export default class PlatformDevCertCalculator extends LightningElement {
    devFundamentalScore = 0;
    processAutoScore = 0;
    userInterfaceScore = 0;
    testDebugDeployScore = 0;

    certificationScore = 0;
    numberOfQuestions = 68;

    currentHistoryId = 0;

    @track attempts = [
        {
            id: 1,
            score: 30
        },
        {
            id: 2,
            score: 50
        },
        {
            id: 3,
            score: 60
        },
    ]

    get hasPassingScore() {
        return this.certificationScore >= 68;
    }

    calculateScore() {
        let devFundamentals = parseFloat(this.devFundamentalScore);
        let processAuto = parseFloat(this.processAutoScore);
        let userInterface = parseFloat(this.userInterfaceScore);
        let testDebugDeploy = parseFloat(this.testDebugDeployScore);

        // Prevent the user from submitting incorrect information
        if (
            isNaN(devFundamentals) || devFundamentals < 0 || devFundamentals > 100 ||
            isNaN(processAuto) || processAuto < 0 || processAuto > 100 ||
            isNaN(userInterface) || userInterface < 0 || userInterface > 100 ||
            isNaN(testDebugDeploy) || testDebugDeploy < 0 || testDebugDeploy > 100
        ) {
            return;
        }

        devFundamentals = devFundamentals * 0.23;
        processAuto = processAuto * 0.30;
        userInterface = userInterface * 0.25;
        testDebugDeploy = testDebugDeploy * 0.22;

        this.certificationScore = devFundamentals + processAuto + userInterface + testDebugDeploy;
        this.certificationScore = this.certificationScore.toFixed(2)

        this.addAttemptHistory()
    }

    handleInputChange(event) {
        const fieldName = event.target.name;
        const inputValue = event.target.value;

        if (fieldName === 'devFundamentals'){
            this.devFundamentalScore = inputValue;
        } else if (fieldName === 'processAuto') {
            this.processAutoScore = inputValue;
        } else if (fieldName === 'userInterface') {
            this.userInterfaceScore = inputValue;
        } else if (fieldName === 'testDebugDeploy') {
            this.testDebugDeployScore = inputValue;
        }
    }

    addAttemptHistory() {
        this.currentHistoryId ++;
        this.attempts.push({
            id: this.currentHistoryId,
            score: this.certificationScore
        });
    }

    deleteAttempt(event) {
        const attemptId = event.detail;
        this.attempts = this.attempts.filter(attempt => attempt.id !== attemptId);
    }

    connectedCallback() {
        this.currentHistoryId = this.attempts.length
    }
}