import { LightningElement, api } from 'lwc';

export default class ScoreInformation extends LightningElement {
    @api score
    @api attemptId
    @api numberOfQuestions

    get numberOfCorrectQuestions() {
        return Math.floor((this.score / 100) * this.numberOfQuestions);
    }

    get numberOfIncorrectQuestions() {
        return this.numberOfQuestions - this.numberOfCorrectQuestions;
    }

    handleDeleteAttempt() {
        const deleteEvent = new CustomEvent('deleteattempt', { detail: this.attemptId })
        this.dispatchEvent(deleteEvent)
    }
}