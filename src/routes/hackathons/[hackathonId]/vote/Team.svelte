<script lang='ts'>
    export let teamName: string;
    export let formVisibility: boolean;
    const handleSubmit = (e) => {
        console.log(e)
        formVisibility = false;
    }
</script>

<div>
    <h2>{teamName}</h2>
    {#if formVisibility}
        <form on:submit|preventDefault ={handleSubmit}>
            <label for="score">Score</label>
            <input type="number" min="0" max="25" name="score" required>
            <label for="comments">Comments</label>
            <textarea name="comments" placeholder="Please write your comments here." required></textarea>
            <button 
                class="btn btn-lg variant-filled-secondary w-full"
                type="submit" on:click={() => confirm("Votes are final and can not be edited. Are you sure?")}>Save vote for this team</button>
        </form>
    {:else}
        <p>Thank you for voting!</p>
    {/if}
</div>